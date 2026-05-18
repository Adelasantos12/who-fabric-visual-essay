import * as d3 from 'd3';
import { NETWORK_DATA as NET, CAT_COLOR } from '../data/network_data.js';

let midOn = false;
let sim = null;

const DEFAULT_COLOR = '#ccc';
function getColor(cat) { return CAT_COLOR[cat] || DEFAULT_COLOR; }

export function toggleMid() {
    midOn = !midOn;
    const btn = document.getElementById('midBtn');
    if (btn) {
        btn.textContent = midOn ? 'Reset view' : 'Highlight Middle Powers';
        btn.className = midOn ? 'btn' : 'btn off';
    }

    const svg = d3.select('#mid-svg');
    if (midOn) {
        svg.selectAll('.node-c').transition().duration(800)
           .attr('opacity', d => d.is_mid ? 1 : 0.15)
           .attr('stroke', d => d.is_mid ? '#D4AF37' : '#fff')
           .attr('stroke-width', d => d.is_mid ? 4 : 1);

        svg.selectAll('.mid-e').transition().duration(800)
           .attr('stroke', '#D4AF37')
           .attr('stroke-opacity', 0.8)
           .attr('stroke-width', 2.5);

        svg.selectAll('.other-e').transition().duration(800)
           .attr('stroke-opacity', 0.05);
    } else {
        svg.selectAll('.node-c').transition().duration(500)
           .attr('opacity', 1)
           .attr('stroke', '#fff')
           .attr('stroke-width', 1);

        svg.selectAll('.mid-e, .other-e').interrupt().transition().duration(500)
           .attr('stroke', '#ddd')
           .attr('stroke-opacity', d => 0.1 + 0.4 * (Math.log(Math.max(d.weight || d.w, .001)) / 10)) // simple fallback
           .attr('stroke-width', d => 0.4 + 2 * (Math.log(Math.max(d.weight || d.w, .001)) / 10));
    }
}

export function buildMidPanel(tipId) {
    const biennium = '2024-25';
    const data = JSON.parse(JSON.stringify(NET[biennium]));
    const wrap = document.querySelector('.mid-view-box');
    const W = wrap.clientWidth || 800, H = 500;

    const svg = d3.select('#mid-svg').attr('width', '100%').attr('height', H);
    svg.selectAll('*').remove();

    const idSet = new Set(data.nodes.map(d => d.id));
    const edges = data.edges.filter(e => {
        const sId = e.source?.id || e.source || e.s;
        const tId = e.target?.id || e.target || e.t;
        return idSet.has(sId) && idSet.has(tId);
    });

    const wArr = data.nodes.map(d => d.total_w).filter(v => v > 0);
    const wMax = d3.max(wArr) || 1, wMin = d3.min(wArr) || 0.001;
    const rScale = d => 5 + 12 * (Math.log(Math.max(d.total_w, 0.001)) - Math.log(wMin)) / (Math.log(wMax) - Math.log(wMin));

    const g = svg.append('g');
    svg.call(d3.zoom().scaleExtent([0.3, 4]).on('zoom', e => g.attr('transform', e.transform)));

    const link = g.append('g').selectAll('line').data(edges).join('line')
        .attr('class', d => {
            const sId = d.source?.id || d.source || d.s;
            const src = data.nodes.find(n => n.id === sId);
            return (src && src.is_mid) ? 'mid-e' : 'other-e';
        })
        .attr('stroke', '#ddd')
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 0.2);

    const nodeG = g.append('g').selectAll('g').data(data.nodes).join('g')
        .call(d3.drag()
            .on('start', (ev, d) => { if (!ev.active) sim.alphaTarget(.3).restart(); d.fx = d.x; d.fy = d.y; })
            .on('drag', (ev, d) => { d.fx = ev.x; d.fy = ev.y; })
            .on('end', (ev, d) => { if (!ev.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }));

    nodeG.append('circle')
        .attr('class', 'node-c')
        .attr('r', d => rScale(d))
        .attr('fill', d => d.is_recep ? '#e0e0e0' : getColor(d.cat))
        .attr('stroke', '#fff')
        .attr('stroke-width', 1);

    nodeG.filter(d => d.is_mid)
        .append('text')
        .attr('dy', '0.32em')
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('fill', '#000')
        .style('pointer-events', 'none')
        .text(d => d.label.split(',')[0].slice(0, 8));

    const tip = d3.select(tipId);
    nodeG.on('mouseenter', (ev, d) => {
        tip.html([
            d.label,
            d.cat,
            d.is_mid ? '◆ Middle-power candidate' : '',
            `Flow: $${(d.total_w / 1e6).toFixed(1)}M`
        ].filter(Boolean).join('<br>')).classed('on', true);
    })
    .on('mousemove', ev => {
        tip.style('left', (ev.clientX + 14) + 'px').style('top', (ev.clientY - 8) + 'px');
    })
    .on('mouseleave', () => tip.classed('on', false));

    sim = d3.forceSimulation(data.nodes)
        .force('link', d3.forceLink(edges).id(d => d.id).distance(50).strength(0.3))
        .force('charge', d3.forceManyBody().strength(-100))
        .force('center', d3.forceCenter(W / 2, H / 2))
        .force('collide', d3.forceCollide(d => rScale(d) + 2))
        .on('tick', () => {
            link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
            nodeG.attr('transform', d => `translate(${d.x},${d.y})`);
        }).alpha(0.8).restart();

    setTimeout(() => sim.alphaTarget(0), 2000);
}
