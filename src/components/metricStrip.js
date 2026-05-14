import { METRICS, M_MAX } from '../data/network_data.js';

export function updateMetrics(biennium) {
    const m = METRICS[biennium];
    if (!m) return;

    const pairs = [
        ['nodes', 'mv-nodes', 'mb-nodes', m.nodes, M_MAX.nodes],
        ['edges', 'mv-edges', 'mb-edges', m.edges, M_MAX.edges],
        ['density', 'mv-density', 'mb-density', m.density, M_MAX.density],
        ['clust', 'mv-clust', 'mb-clust', m.clust, M_MAX.clust],
        ['wcc', 'mv-wcc', 'mb-wcc', m.wcc, M_MAX.wcc],
        ['mod', 'mv-mod', 'mb-mod', m.mod, M_MAX.mod],
    ];

    const isAlert = (k, v) =>
        (k === 'wcc' && v > 50) ||
        (k === 'mod' && v > 0.4) ||
        (k === 'density' && v < 0.006) ||
        (k === 'clust' && v < 0.02);

    pairs.forEach(([k, vid, bid, val, max]) => {
        const vEl = document.getElementById(vid);
        const bEl = document.getElementById(bid);
        if (!vEl || !bEl) return;

        const fmt = (k === 'density' || k === 'clust' || k === 'mod') ? val.toFixed(3) : val.toLocaleString();
        vEl.textContent = fmt;

        if (isAlert(k, val)) {
            vEl.classList.add('alert');
            bEl.classList.add('alert');
        } else {
            vEl.classList.remove('alert');
            bEl.classList.remove('alert');
        }

        bEl.style.width = Math.round((val / max) * 100) + '%';
    });
}
