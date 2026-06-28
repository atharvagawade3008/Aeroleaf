document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible so it doesn't repeat
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Simple parallax effect for the glow on mouse move in hero section
    const hero = document.querySelector('.hero');
    const glow = document.querySelector('.glow-backdrop');
    const img = document.querySelector('.hero-image img');

    if (hero && glow && img) {
        hero.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth - 0.5;
            const y = e.clientY / window.innerHeight - 0.5;

            glow.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
            img.style.transform = `translate(${x * -20}px, ${y * -20}px) rotate(${x * 5}deg)`;
        });

        // Reset transform when mouse leaves
        hero.addEventListener('mouseleave', () => {
            glow.style.transform = `translate(0px, 0px)`;
            img.style.transform = `translate(0px, 0px) rotate(0deg)`;
            img.style.animation = 'float 6s ease-in-out infinite';
        });

        hero.addEventListener('mouseenter', () => {
            img.style.animation = 'none'; // pause float animation during parallax
        });

        // Add scroll-based animation to the image
        window.addEventListener('scroll', () => {
            // Calculate how far we've scrolled (0 to 1 based on first 800px)
            const scrollY = window.scrollY;
            const maxScroll = 800;
            const scrollPercent = Math.min(scrollY / maxScroll, 1);

            // If not doing parallax (mouse not over hero), let scroll affect transform
            // We can add a class to body or just apply directly
            // Actually, a nice effect is to move the image up and scale it down slightly as we scroll away
            img.style.transform = `translateY(${scrollY * 0.3}px) scale(${1 - scrollPercent * 0.1}) rotate(${scrollY * 0.02}deg)`;
            glow.style.transform = `translateY(${scrollY * 0.2}px) scale(${1 - scrollPercent * 0.2})`;

            // To ensure parallax works smoothly when hovering, we might need a small state check
            // For simplicity, let's just apply this during scroll. Parallax will override on mousemove over hero.
        });
    }

    // Generate Background Particles
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    document.body.prepend(particleContainer);

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 15 + 5; // 5px to 20px
        const left = Math.random() * 100; // 0% to 100%
        const duration = Math.random() * 10 + 10; // 10s to 20s
        const delay = Math.random() * 10; // 0s to 10s

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `-${delay}s`;

        // Randomize glow color occasionally
        if (Math.random() > 0.5) {
            particle.style.background = 'var(--accent-cyan)';
        }

        particleContainer.appendChild(particle);
    }

    // Custom Cursor Follower
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
        // Smooth easing effect
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        // Use translate3d for performance
        cursorGlow.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Make cursor glow react to clickable elements
    const clickables = document.querySelectorAll('a, button');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => cursorGlow.classList.add('active'));
        el.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));
    });

    // Immersive Video Modal
    const watchVideoBtn = document.getElementById('watchVideoBtn');
    const videoModal = document.getElementById('videoModal');
    const closeVideoBtn = document.querySelector('.close-video-btn');
    const promoVideo = document.getElementById('promoVideo');
    const videoOverlay = document.querySelector('.video-modal-overlay');

    if (watchVideoBtn && videoModal) {
        function openVideo() {
            videoModal.classList.add('active');
            promoVideo.play();
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        function closeVideo() {
            videoModal.classList.remove('active');
            promoVideo.pause();
            // Reset video to start
            setTimeout(() => {
                promoVideo.currentTime = 0;
            }, 500); // wait for fade out transition
            // Restore body scroll
            document.body.style.overflow = '';
        }

        watchVideoBtn.addEventListener('click', openVideo);
        closeVideoBtn.addEventListener('click', closeVideo);
        videoOverlay.addEventListener('click', closeVideo);
    }
});
