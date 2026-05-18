export function initBindingMap(svgId) {
    const svg = document.getElementById(svgId);
    if (!svg) return;

    // The SVG is static in index.html, but we handle the play animation here.
}

let mapPlayed = false;
export function playMap() {
    if (mapPlayed) return;
    mapPlayed = true;

    const playBtn = document.getElementById('playBtn');
    if (playBtn) playBtn.classList.remove('off');

    const seq = [
        [['bp1'], []],
        [['bp1', 'bp2'], ['ba1']],
        [['bp1', 'bp2', 'bp3'], ['ba1', 'ba2']],
        [['bp1', 'bp2', 'bp3', 'bp4'], ['ba1', 'ba2', 'ba3']],
        [['bp1', 'bp2', 'bp3', 'bp4', 'bp5'], ['ba1', 'ba2', 'ba3', 'ba4']],
    ];

    seq.forEach(([pts, arrs], i) => {
        setTimeout(() => {
            for (let j = 1; j <= 5; j++) {
                const el = document.getElementById('bp' + j);
                if (el) {
                    if (pts.includes('bp' + j)) el.classList.add('on');
                }
            }
            for (let j = 1; j <= 4; j++) {
                const el = document.getElementById('ba' + j);
                if (el) {
                    if (arrs.includes('ba' + j)) el.classList.add('on');
                }
            }
            if (i === seq.length - 1) {
                const n = document.getElementById('bmap-note');
                if (n) {
                    n.style.opacity = 1;
                    n.style.transition = 'opacity .6s';
                }
            }
        }, i * 700);
    });
}

export function resetMap() {
    mapPlayed = false;
    for (let j = 1; j <= 5; j++) {
        const el = document.getElementById('bp' + j);
        if (el) el.classList.remove('on');
    }
    for (let j = 1; j <= 4; j++) {
        const el = document.getElementById('ba' + j);
        if (el) el.classList.remove('on');
    }
    const n = document.getElementById('bmap-note');
    if (n) n.style.opacity = 0;
}
