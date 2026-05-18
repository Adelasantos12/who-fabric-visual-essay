export function initScroll(onStepEnter) {
    const steps = document.querySelectorAll('.step[data-step]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const step = entry.target.dataset.step;
                onStepEnter(step);
            }
        });
    }, { threshold: 0.4 });

    steps.forEach(step => observer.observe(step));

    // Progress bar logic
    window.addEventListener('scroll', () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const prog = document.getElementById('prog');
        if (prog) {
            prog.style.width = (h > 0 ? window.scrollY / h * 100 : 0) + '%';
        }
    });
}
