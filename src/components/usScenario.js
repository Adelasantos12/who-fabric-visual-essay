import * as d3 from 'd3';
import { NETWORK_DATA as NET, CAT_COLOR } from '../data/network_data.js';

let usOn = false;

const DEFAULT_COLOR = '#ccc';
function getColor(cat) { return CAT_COLOR[cat] || DEFAULT_COLOR; }

export function toggleUS() {
    usOn = !usOn;
    const btn = document.getElementById('usBtn');
    if (btn) {
        btn.textContent = usOn ? 'Restore US flows' : 'Remove US flows';
        btn.className = usOn ? 'btn' : 'btn off';
    }
    const expNote = document.getElementById('expNote');
    if (expNote) {
        expNote.className = usOn ? 'exposure-note on' : 'exposure-note';
    }

    // Fading logic for US-related elements
    d3.selectAll('.us-edge').transition().duration(600)
        .attr('stroke-opacity', usOn ? 0.03 : null)
        .attr('stroke', usOn ? '#ddd' : '#FFCDD2');

    d3.selectAll('.us-node circle').transition().duration(600)
        .attr('opacity', usOn ? 0.15 : 1);

    // US Panel specific elements
    d3.select('#us-svg').selectAll('.us-e').transition().duration(600)
        .attr('stroke-opacity', usOn ? 0.03 : null);

    d3.selectAll('.dep-ring').transition().duration(600)
        .attr('opacity', usOn ? 1 : 0);
}

export function buildUSPanel(svgId, tipId) {
    const biennium = '2024-25';
    const data = NET[biennium];
    if (!data) return;

    const wrap = document.getElementById('us-net-wrap');
    const W = wrap.clientWidth, H = wrap.clientHeight || 520;
    const svg = d3.select(svgId).attr('width', W).attr('height', H);
    svg.selectAll('*').remove();

    const idSet = new Set(data.nodes.map(d => d.id));
    const edges = data.edges.filter(e => idSet.has(e.s) && idSet.has(e.t));

    const wArr = data.nodes.map(d => d.total_w).filter(v => v > 0);
    const wMax = d3.max(wArr) || 1, wMin = d3.min(wArr) || 0.001;
    const rScale = d => 5 + 11 * (Math.log(Math.max(d.total_w, 0.001)) - Math.log(wMin)) / (Math.log(wMax) - Math.log(wMin));

    const eArr = edges.map(e => e.w).filter(v => v > 0);
    const eMax = d3.max(eArr) || 1, eMin = d3.min(eArr) || 0.001;
    const eOp = w => 0.1 + 0.4 * (Math.log(Math.max(w, .001)) - Math.log(eMin)) / (Math.log(eMax) - Math.log(eMin));
    const eW = w => 0.4 + 2 * (Math.log(Math.max(w, .001)) - Math.log(eMin)) / (Math.log(eMax) - Math.log(eMin));

    const g = svg.append('g');
    svg.call(d3.zoom().scaleExtent([0.3, 4]).on('zoom', e => g.attr('transform', e.transform)));

    const depLabels = ['Poland', 'Czechia', 'Slovakia', 'Iraq'];
    const depIds = new Set(data.nodes.filter(d => depLabels.some(l => d.label.includes(l))).map(d => d.id));

    const link = g.append('g').selectAll('line').data(edges).join('line')
        .attr('class', d => {
            const src = data.nodes.find(n => n.id === d.s);
            return (src && src.is_us) ? 'us-e' : '';
        })
        .attr('stroke', d => {
            const src = data.nodes.find(n => n.id === d.s);
            return (src && src.is_us) ? '#FFCDD2' : '#ddd';
        })
        .attr('stroke-width', d => eW(d.w))
        .attr('stroke-opacity', d => eOp(d.w));

    const nodeG = g.append('g').selectAll('g').data(data.nodes).join('g')
        .call(d3.drag()
            .on('start', (ev, d) => { if (!ev.active) sim2.alphaTarget(.3).restart(); d.fx = d.x; d.fy = d.y; })
            .on('drag', (ev, d) => { d.fx = ev.x; d.fy = ev.y; })
            .on('end', (ev, d) => { if (!ev.active) sim2.alphaTarget(0); d.fx = null; d.fy = null; }));

    nodeG.append('circle')
        .attr('r', d => rScale(d))
        .attr('fill', d => d.is_recep ? '#e0e0e0' : getColor(d.cat))
        .attr('stroke', d => d.is_us ? '#B71C1C' : '#fff')
        .attr('stroke-width', d => d.is_us ? 2.5 : 1)
        .attr('class', d => d.is_us ? 'us-node-c' : '');

    nodeG.filter(d => depIds.has(d.id))
        .append('circle')
        .attr('class', 'dep-ring')
        .attr('r', d => rScale(d) + 5)
        .attr('fill', 'none')
        .attr('stroke', '#FF6D00')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '4,3')
        .attr('opacity', 0);

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

    const sim2 = d3.forceSimulation(data.nodes)
        .force('link', d3.forceLink(edges).id(d => d.id).distance(50).strength(0.35))
        .force('charge', d3.forceManyBody().strength(-100))
        .force('center', d3.forceCenter(W / 2, H / 2))
        .force('collide', d3.forceCollide(d => rScale(d) + 2))
        .on('tick', () => {
            link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
            nodeG.attr('transform', d => `translate(${d.x},${d.y})`);
        }).alpha(0.8).restart();

    setTimeout(() => sim2.alphaTarget(0), 2500);
}
