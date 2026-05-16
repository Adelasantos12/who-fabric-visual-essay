import * as d3 from 'd3';
import { NETWORK_DATA as NET, CAT_COLOR } from '../data/network_data.js';

let usOn = false;
let simBaseline = null;
let simExposed = null;
let stats = { ties: 0, flow: 0, dep: 0 };

const DEFAULT_COLOR = '#ccc';
function getColor(cat) { return CAT_COLOR[cat] || DEFAULT_COLOR; }

export function toggleUS() {
    usOn = !usOn;
    const btn = document.getElementById('usBtn');
    if (btn) {
        btn.textContent = usOn ? 'Reset view' : 'Show US exposure';
        btn.className = usOn ? 'btn' : 'btn off';
    }

    const statInitial = document.querySelector('.stat-initial');
    const statItems = document.querySelectorAll('.stat-item');

    if (usOn) {
        if (statInitial) statInitial.style.display = 'none';
        statItems.forEach(el => {
            el.style.display = 'inline';
            el.classList.add('active');
        });

        // Step-wise animation
        const usEdges = d3.select('#us-svg-exposed').selectAll('.us-e');
        usEdges.classed('us-edge-highlight', true);

        // Update stats
        document.getElementById('stat-ties').textContent = stats.ties;
        document.getElementById('stat-flow').textContent = `$${stats.flow}M`;
        document.getElementById('stat-dep').textContent = stats.dep;

        setTimeout(() => {
            usEdges.classed('us-edge-highlight', false)
                .transition().duration(1000)
                .attr('stroke-opacity', 0.03)
                .attr('stroke', '#ddd');

            d3.select('#us-svg-exposed').selectAll('.us-node-c').transition().duration(1000)
                .attr('opacity', 0.15);

            d3.select('#us-svg-exposed').selectAll('.dep-ring').transition().delay(500).duration(1000)
                .attr('opacity', 1);
        }, 1500);

    } else {
        if (statInitial) statInitial.style.display = 'inline';
        statItems.forEach(el => {
            el.style.display = 'none';
            el.classList.remove('active');
        });

        const exposed = d3.select('#us-svg-exposed');
        exposed.selectAll('.us-e').interrupt().transition().duration(500)
            .attr('stroke-opacity', null)
            .attr('stroke', '#FFCDD2');

        exposed.selectAll('.us-node-c').interrupt().transition().duration(500)
            .attr('opacity', 1);

        exposed.selectAll('.dep-ring').interrupt().transition().duration(500)
            .attr('opacity', 0);

        document.getElementById('stat-ties').textContent = '0';
        document.getElementById('stat-flow').textContent = '$0M';
        document.getElementById('stat-dep').textContent = '0';
    }
}

function buildSinglePanel(svgId, data, isExposed, tipId) {
    const wrap = document.querySelector('.us-view-box');
    const W = wrap.clientWidth, H = 500 - 35;
    const svg = d3.select(svgId).attr('width', '100%').attr('height', '100%');
    svg.selectAll('*').remove();

    const idSet = new Set(data.nodes.map(d => d.id));
    const edges = data.edges.filter(e => {
        const sId = e.source?.id || e.source || e.s;
        const tId = e.target?.id || e.target || e.t;
        return idSet.has(sId) && idSet.has(tId);
    });

    // Dynamic Exposure Calculation
    const US_IDS = new Set(data.nodes.filter(d => d.is_us).map(d => d.id));
    const nodeStats = {};
    data.nodes.forEach(n => { nodeStats[n.id] = { totalIn: 0, usIn: 0 }; });
    edges.forEach(e => {
        const sId = e.source?.id || e.source || e.s;
        const tId = e.target?.id || e.target || e.t;
        const w = e.weight || e.w || 0;
        if (nodeStats[tId]) {
            nodeStats[tId].totalIn += w;
            if (US_IDS.has(sId)) nodeStats[tId].usIn += w;
        }
    });

    const depIds = new Set(
        data.nodes
            .filter(n => {
                const s = nodeStats[n.id];
                return s.totalIn > 0 && (s.usIn / s.totalIn) >= 0.5;
            })
            .map(n => n.id)
    );

    // Global Stats for US Toggle
    const usEdgesFilter = edges.filter(e => {
        const sId = e.source?.id || e.source || e.s;
        return US_IDS.has(sId);
    });
    stats = {
        ties: usEdgesFilter.length,
        flow: Math.round(d3.sum(usEdgesFilter, e => (e.weight || e.w || 0)) / 1e6),
        dep: depIds.size
    };

    const wArr = data.nodes.map(d => d.total_w).filter(v => v > 0);
    const wMax = d3.max(wArr) || 1, wMin = d3.min(wArr) || 0.001;
    const rScale = d => 5 + 11 * (Math.log(Math.max(d.total_w, 0.001)) - Math.log(wMin)) / (Math.log(wMax) - Math.log(wMin));

    const eArr = edges.map(e => e.weight || e.w).filter(v => v > 0);
    const eMax = d3.max(eArr) || 1, eMin = d3.min(eArr) || 0.001;
    const eOp = w => 0.1 + 0.4 * (Math.log(Math.max(w, .001)) - Math.log(eMin)) / (Math.log(eMax) - Math.log(eMin));
    const eW = w => 0.4 + 2 * (Math.log(Math.max(w, .001)) - Math.log(eMin)) / (Math.log(eMax) - Math.log(eMin));

    const g = svg.append('g');
    svg.call(d3.zoom().scaleExtent([0.3, 4]).on('zoom', e => g.attr('transform', e.transform)));

    const link = g.append('g').selectAll('line').data(edges).join('line')
        .attr('class', d => {
            const sId = d.source?.id || d.source || d.s;
            return US_IDS.has(sId) ? 'us-e' : '';
        })
        .attr('stroke', d => {
            const sId = d.source?.id || d.source || d.s;
            return US_IDS.has(sId) ? '#FFCDD2' : '#ddd';
        })
        .attr('stroke-width', d => eW(d.weight || d.w))
        .attr('stroke-opacity', d => eOp(d.weight || d.w));

    const nodeG = g.append('g').selectAll('g').data(data.nodes).join('g')
        .call(d3.drag()
            .on('start', (ev, d) => { if (!ev.active) sim.alphaTarget(.3).restart(); d.fx = d.x; d.fy = d.y; })
            .on('drag', (ev, d) => { d.fx = ev.x; d.fy = ev.y; })
            .on('end', (ev, d) => { if (!ev.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }));

    nodeG.append('circle')
        .attr('r', d => rScale(d))
        .attr('fill', d => d.is_recep ? '#e0e0e0' : getColor(d.cat))
        .attr('stroke', d => d.is_us ? '#B71C1C' : '#fff')
        .attr('stroke-width', d => d.is_us ? 2.5 : 1)
        .attr('class', d => d.is_us ? 'us-node-c' : '');

    if (isExposed) {
        nodeG.filter(d => depIds.has(d.id))
            .append('circle')
            .attr('class', 'dep-ring')
            .attr('r', d => rScale(d) + 5)
            .attr('fill', 'none')
            .attr('stroke', '#FF6D00')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '4,3')
            .attr('opacity', 0);
    }

    const tip = d3.select(tipId);
    nodeG.on('mouseenter', (ev, d) => {
        tip.html([
            d.label,
            d.cat,
            d.out_w > 0 ? `Out: $${(d.out_w / 1e6).toFixed(1)}M` : '',
            d.in_w > 0 ? `In: $${(d.in_w / 1e6).toFixed(1)}M` : '',
            d.is_us ? '★ US entity' : '',
            depIds.has(d.id) ? '⚠ ≥50% US-dependent' : '',
        ].filter(Boolean).join('<br>')).classed('on', true);
    })
    .on('mousemove', ev => {
        tip.style('left', (ev.clientX + 14) + 'px').style('top', (ev.clientY - 8) + 'px');
    })
    .on('mouseleave', () => tip.classed('on', false));

    const sim = d3.forceSimulation(data.nodes)
        .force('link', d3.forceLink(edges).id(d => d.id).distance(50).strength(0.35))
        .force('charge', d3.forceManyBody().strength(-100))
        .force('center', d3.forceCenter(W / 2, H / 2))
        .force('collide', d3.forceCollide(d => rScale(d) + 2))
        .on('tick', () => {
            link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
            nodeG.attr('transform', d => `translate(${d.x},${d.y})`);
        }).alpha(0.8).restart();

    setTimeout(() => sim.alphaTarget(0), 2500);
    return sim;
}

export function buildUSPanel(unusedId, tipId) {
    const biennium = '2024-25';
    const data = JSON.parse(JSON.stringify(NET[biennium]));
    const dataExposed = JSON.parse(JSON.stringify(NET[biennium]));

    simBaseline = buildSinglePanel('#us-svg-baseline', data, false, tipId);
    simExposed = buildSinglePanel('#us-svg-exposed', dataExposed, true, tipId);
}
