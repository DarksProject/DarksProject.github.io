// Smooth scrolling animation for service cards
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Enhanced entrance animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.8s ease-out ${index * 0.15}s both, float 3s ease-in-out ${index * 0.2 + 2}s infinite`;
            }
        });
    }, observerOptions);
    
    serviceCards.forEach(card => {
        observer.observe(card);
    });
    
    // Enhanced click animation
    serviceCards.forEach(card => {
        card.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-10px) scale(0.98)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Smooth scroll for any potential internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add subtle parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add atmospheric particle effect
    createParticles();
    
    createConstellations();
});

function createParticles() {
    const particleCount = 30; // Reduced for better performance
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
        `;
        document.body.appendChild(particle);
        
        particles.push({
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
        });
    }
    
    function animateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
            if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
            
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Add constellation effect
function createConstellations() {
    const constellationContainer = document.createElement('div');
    constellationContainer.className = 'constellations';
    constellationContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    // Create constellation lines
    for (let i = 0; i < 5; i++) {
        const line = document.createElement('div');
        line.style.cssText = `
            position: absolute;
            width: 200px;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transform-origin: left center;
            animation: constellation-pulse ${3 + Math.random() * 2}s ease-in-out infinite alternate;
        `;
        line.style.top = Math.random() * 100 + '%';
        line.style.left = Math.random() * 80 + '%';
        line.style.transform = `rotate(${Math.random() * 360}deg)`;
        constellationContainer.appendChild(line);
    }
    
    document.body.appendChild(constellationContainer);
}

// Add CSS for constellation animation
const constellationStyle = document.createElement('style');
constellationStyle.textContent = `
    @keyframes constellation-pulse {
        0% { opacity: 0.1; }
        100% { opacity: 0.4; }
    }
`;
document.head.appendChild(constellationStyle);