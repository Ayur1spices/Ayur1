
document.addEventListener('DOMContentLoaded', function() {
    // Animate hero text
    const heroText = document.querySelector('.hero-text');
    const scrollHint = document.querySelector('.scroll-hint');
    if (heroText && scrollHint) {
        setTimeout(() => {
            heroText.classList.add('animate');
            scrollHint.classList.add('animate');
            const letters = document.querySelectorAll('.hero-text h1 span');
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.style.opacity = '1';
                    letter.style.transform = 'translateY(0) scale(1)';
                }, index * 120);
            });
        }, 800);
    } else {
        console.warn('Hero text or scroll hint not found');
    }

    // Scroll animations
    const animateElements = document.querySelectorAll('.section, .section-title, .section-text, .card, .decorative-line, .idukki-section .btn-premium, .spice-jar-3d');
    
    function checkScroll() {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.85;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerPoint && !element.classList.contains('animate')) {
                element.classList.add('animate');
            }
        });
    }

    // Run checkScroll immediately and on scroll
    try {
        checkScroll();
        window.addEventListener('scroll', checkScroll);
    } catch (error) {
        console.error('Error in checkScroll:', error);
    }

    // Custom Cursor with Ripple Effect
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.btn-premium, .card')) {
            cursor.classList.add('ripple');
            setTimeout(() => {
                cursor.classList.remove('ripple');
            }, 600);
        }
    });

    // Staggered card animations
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Log for debugging
    console.log('Animation script loaded. Elements to animate:', animateElements.length);
});

function learnMore() {
    window.location.href = 'idukki.html';
}
