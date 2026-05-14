import './styles.css';
import { initNetwork, renderNetwork } from './components/network.js';
import { updateMetrics } from './components/metricStrip.js';
import { initScroll } from './components/scrollController.js';
import { buildUSPanel, toggleUS } from './components/usScenario.js';
import { playMap } from './components/bindingMap.js';

window.addEventListener('load', () => {
    // Initialize components
    initNetwork('#net-svg');
    buildUSPanel('#us-svg', '#tip');

    // Initial render
    renderNetwork('2016-17', '#net-svg', '#tip');
    updateMetrics('2016-17');

    // Setup scroll interactions
    initScroll((step) => {
        if (step && step !== 'intro') {
            renderNetwork(step, '#net-svg', '#tip');
            updateMetrics(step);
        }
    });

    // Event listeners for interactive elements
    const usBtn = document.getElementById('usBtn');
    if (usBtn) {
        usBtn.addEventListener('click', toggleUS);
    }

    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
        playBtn.addEventListener('click', playMap);
    }
});
