import './styles.css';
import { initNetwork, renderNetwork } from './components/network.js';
import { updateMetrics } from './components/metricStrip.js';
import { initScroll } from './components/scrollController.js';
import { buildUSPanel, toggleUS } from './components/usScenario.js';
import { buildMidPanel, toggleMid } from './components/midPowers.js';
import { playMap } from './components/bindingMap.js';

window.addEventListener('load', () => {
    // Initialize components
    initNetwork('#net-svg');
    buildUSPanel('#us-svg', '#tip');
    buildMidPanel('#tip');

    // Initial state: hide metrics if at intro
    updateMetrics('intro');
    renderNetwork('2016-17', '#net-svg', '#tip');

    // Setup scroll interactions
    initScroll((step) => {
        if (step) {
            if (step !== 'intro') {
                renderNetwork(step, '#net-svg', '#tip');
            }
            updateMetrics(step);
        }
    });

    // Event listeners for interactive elements
    const usBtn = document.getElementById('usBtn');
    if (usBtn) {
        usBtn.addEventListener('click', toggleUS);
    }

    const midBtn = document.getElementById('midBtn');
    if (midBtn) {
        midBtn.addEventListener('click', toggleMid);
    }

    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
        playBtn.addEventListener('click', playMap);
    }
});
