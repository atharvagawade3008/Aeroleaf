document.addEventListener('DOMContentLoaded', () => {
    // Shared intersection observer logic (can refactor into shared file later, keeping simple for now)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animElements.forEach(el => observer.observe(el));

    // Custom Cursor (duplicated for this page)
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursorGlow.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // 360 Auto-Rotation and Dynamic Info
    const productWrapper = document.getElementById('productWrapper');
    const hotspots = document.querySelectorAll('.hotspot');
    const infoTitle = document.getElementById('dynamic-info-title');
    const infoText = document.getElementById('dynamic-info-text');
    const infoContainer = document.getElementById('dynamic-info-container');

    const defaultTitle = "Interactive Hologram";
    const defaultText = "Hover over the glowing points while it rotates to reveal its secrets.";

    if (productWrapper) {
        // Pause rotation when hovering any hotspot
        hotspots.forEach(hotspot => {
            hotspot.addEventListener('mouseenter', () => {
                productWrapper.classList.add('paused');

                // Update info text
                infoTitle.textContent = hotspot.getAttribute('data-title');
                infoText.textContent = hotspot.getAttribute('data-info');
                infoContainer.classList.add('active-info');
            });

            hotspot.addEventListener('mouseleave', () => {
                productWrapper.classList.remove('paused');

                // Revert info text
                infoTitle.textContent = defaultTitle;
                infoText.textContent = defaultText;
                infoContainer.classList.remove('active-info');
            });

            // Allow cursor active state
            hotspot.addEventListener('mouseenter', () => cursorGlow.classList.add('active'));
            hotspot.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));
        });

        // Pause rotation if the user hovers over the product image itself (optional, good for mobile tap/hold UX)
        const productImage = document.querySelector('.product-image');
        productImage.addEventListener('mouseenter', () => productWrapper.classList.add('paused'));
        productImage.addEventListener('mouseleave', () => productWrapper.classList.remove('paused'));
    }

    // Generate Particles
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    document.body.prepend(particleContainer);

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 15 + 5;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 10;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `-${delay}s`;
        if (Math.random() > 0.5) particle.style.background = 'var(--accent-cyan)';
        particleContainer.appendChild(particle);
    }
});
