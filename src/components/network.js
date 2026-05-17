import * as d3 from 'd3';
import { NETWORK_DATA as NET, CAT_COLOR } from '../data/network_data.js';

let simRef = null;
let gRef = null;

const DEFAULT_COLOR = '#ccc';
function getColor(cat) { return CAT_COLOR[cat] || DEFAULT_COLOR; }

export function initNetwork(svgId) {
    const svg = d3.select(svgId);
    svg.selectAll('*').remove();
    const box = svg.node().getBoundingClientRect();
    const W = box.width || 500, H = box.height || 400;
    const g = svg.append('g').attr('class', 'net-g');
    gRef = g;

    const zoom = d3.zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        });

    svg.call(zoom);

    svg.append('text')
        .attr('x', W / 2)
        .attr('y', H - 10)
        .attr('text-anchor', 'middle')
        .attr('font-size', 10)
        .attr('font-family', 'Courier New')
        .attr('fill', '#ccc')
        .text('Scroll to explore · Click & drag to pan · Scroll to zoom');

    return { svg, g, zoom };
}

export function renderNetwork(biennium, svgId, tipId) {
    if (!NET[biennium]) return;
    if (simRef) simRef.stop();

    const data = NET[biennium];
    const svg = d3.select(svgId);
    const box = svg.node().getBoundingClientRect();
    const W = box.width || 500, H = box.height || 400;

    const idSet = new Set(data.nodes.map(d => d.id));
    const edges = data.edges.filter(e => {
        const s = e.source?.id || e.source || e.s;
        const t = e.target?.id || e.target || e.t;
        return idSet.has(s) && idSet.has(t);
    });

    // node scale
    const wArr = data.nodes.map(d => d.total_w).filter(v => v > 0);
    const wMax = d3.max(wArr) || 1, wMin = d3.min(wArr) || 0.001;
    const rScale = d => {
        const v = Math.max(d.total_w, 0.001);
        return 5 + 13 * (Math.log(v) - Math.log(wMin)) / (Math.log(wMax) - Math.log(wMin));
    };

    // edge scale
    const eArr = edges.map(e => e.weight || e.w).filter(v => v > 0);
    const eMax = d3.max(eArr) || 1, eMin = d3.min(eArr) || 0.001;
    const eWidth = w => 0.4 + 2.5 * (Math.log(Math.max(w, 0.001)) - Math.log(eMin)) / (Math.log(eMax) - Math.log(eMin));
    const eOp = w => 0.12 + 0.45 * (Math.log(Math.max(w, 0.001)) - Math.log(eMin)) / (Math.log(eMax) - Math.log(eMin));

    const g = gRef;
    g.selectAll('*').remove();

    // links
    const link = g.append('g').attr('class', 'links')
        .selectAll('line').data(edges).join('line')
        .attr('stroke', d => {
            const sId = d.source?.id || d.source || d.s;
            const src = data.nodes.find(n => n.id === sId);
            return (src && src.is_us) ? '#FFCDD2' : '#ccc';
        })
        .attr('stroke-width', d => eWidth(d.weight || d.w))
        .attr('stroke-opacity', d => eOp(d.weight || d.w))
        .attr('class', d => {
            const sId = d.source?.id || d.source || d.s;
            const src = data.nodes.find(n => n.id === sId);
            return (src && src.is_us) ? 'us-edge' : '';
        });

    // nodes
    const nodeG = g.append('g').attr('class', 'nodes')
        .selectAll('g').data(data.nodes).join('g')
        .attr('class', d => 'node-g' + (d.is_us ? ' us-node' : '') + (d.is_mid ? ' mid-node' : ''))
        .call(d3.drag()
            .on('start', (event, d) => { if (!event.active) simRef.alphaTarget(.3).restart(); d.fx = d.x; d.fy = d.y; })
            .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
            .on('end', (event, d) => { if (!event.active) simRef.alphaTarget(0); d.fx = null; d.fy = null; }));

    nodeG.append('circle')
        .attr('r', d => rScale(d))
        .attr('fill', d => d.is_recep ? '#e0e0e0' : getColor(d.cat))
        .attr('stroke', d => d.is_us ? '#B71C1C' : (d.is_mid ? '#F9A825' : '#fff'))
        .attr('stroke-width', d => (d.is_us || d.is_mid) ? 2.5 : 1);

    // labels for top nodes
    const topW = d3.quantile(data.nodes.map(d => d.total_w).sort(d3.ascending), 0.9);
    nodeG.filter(d => d.total_w >= topW || d.is_us || d.is_mid)
        .append('text')
        .attr('dy', '0.32em')
        .attr('text-anchor', 'middle')
        .attr('font-size', d => Math.max(7, Math.min(9, rScale(d) - 1)))
        .attr('font-family', 'Courier New')
        .attr('fill', '#fff')
        .attr('pointer-events', 'none')
        .text(d => {
            const lbl = d.label;
            if (lbl.includes('USAID')) return 'USAID';
            if (lbl.includes('Gates')) return 'Gates';
            if (lbl.includes('Germany')) return 'DE';
            if (lbl.includes('European Commission')) return 'EU';
            if (lbl.includes('Canada')) return 'CA';
            if (lbl.includes('France')) return 'FR';
            if (lbl.includes('China')) return 'CN';
            if (lbl.includes('India')) return 'IN';
            if (lbl.includes('United Kingdom')) return 'UK';
            if (lbl.includes('Assessed')) return 'AC';
            if (lbl.includes('GAVI')) return 'GAVI';
            if (lbl.includes('CDC,') || lbl.includes('CDC, U')) return 'CDC';
            if (lbl.includes('NIH')) return 'NIH';
            return lbl.slice(0, 4);
        });

    // tooltip
    const tip = d3.select(tipId);
    nodeG
        .on('mouseenter', (event, d) => {
            const lines = [
                d.label,
                d.cat,
                d.out_w > 0 ? `Out: $${(d.out_w / 1e6).toFixed(1)}M` : '',
                d.in_w > 0 ? `In: $${(d.in_w / 1e6).toFixed(1)}M` : '',
                d.is_us ? '★ US entity' : '',
                d.is_mid ? '◆ Middle-power candidate' : '',
                `Modularity Class: ${d.mod_cls}`
            ].filter(Boolean).join('<br>');
            tip.html(lines).classed('on', true);
        })
        .on('mousemove', event => {
            tip.style('left', (event.clientX + 14) + 'px')
               .style('top', (event.clientY - 8) + 'px');
        })
        .on('mouseleave', () => tip.classed('on', false));

    // force sim
    simRef = d3.forceSimulation(data.nodes)
        .force('link', d3.forceLink(edges).id(d => d.id).distance(55).strength(0.4))
        .force('charge', d3.forceManyBody().strength(-120))
        .force('center', d3.forceCenter(W / 2, H / 2))
        .force('collide', d3.forceCollide(d => rScale(d) + 3))
        .on('tick', () => {
            link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
            nodeG.attr('transform', d => `translate(${d.x},${d.y})`);
        })
        .alpha(0.8).restart();

    setTimeout(() => { if (simRef) simRef.alphaTarget(0); }, 2500);
}
