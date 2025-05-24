document.addEventListener('DOMContentLoaded', function() {
    // ===== CURSOR EFFECTS =====
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Magnetic cursor effect
    const magneticElements = document.querySelectorAll('a, button, .spice-item, .state-item, .image-container');
    magneticElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });

    // ===== AMBIENT AUDIO SYSTEM =====
    const ambientAudio = document.getElementById('ambientAudio');
    const soundToggle = document.querySelector('.sound-toggle');
    let audioEnabled = true;

    // Auto-play music on load
    window.addEventListener('load', () => {
        const playAudio = () => {
            ambientAudio.play().then(() => {
                soundToggle.innerHTML = '<span class="sound-icon">🔊</span>';
                soundToggle.style.background = 'rgba(230, 126, 34, 0.5)';
            }).catch(error => {
                console.log("Auto-play prevented. Click to enable sound.");
                audioEnabled = false;
                soundToggle.innerHTML = '<span class="sound-icon">🔇</span>';
                soundToggle.style.background = 'rgba(255,255,255,0.2)';
            });
        };
        
        playAudio();
        
        document.body.addEventListener('click', () => {
            if (!audioEnabled) {
                playAudio();
            }
        }, { once: true });
    });

    soundToggle.addEventListener('click', () => {
        audioEnabled = !audioEnabled;
        if(audioEnabled) {
            ambientAudio.play();
            soundToggle.innerHTML = '<span class="sound-icon">🔊</span>';
            soundToggle.style.background = 'rgba(230, 126, 34, 0.5)';
        } else {
            ambientAudio.pause();
            soundToggle.innerHTML = '<span class="sound-icon">🔇</span>';
            soundToggle.style.background = 'rgba(255,255,255,0.2)';
        }
    });

    // ===== SCROLL PROGRESS =====
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        document.querySelector('.scroll-progress').style.width = `${progress}%`;
    });

    // ===== SECTION NAVIGATION DOTS =====
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('.story-section');
    
    navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const sectionId = dot.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            window.scrollTo({
                top: section.offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach((section, index) => {
            if(section.offsetTop <= scrollPosition && 
               section.offsetTop + section.offsetHeight > scrollPosition) {
                navDots.forEach(dot => dot.classList.remove('active'));
                navDots[index].classList.add('active');
            }
        });
    });

    // ===== IMAGE LIGHTBOX =====
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.close-lightbox');
    
    document.querySelectorAll('.image-zoom-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            const imgSrc = e.target.closest('.image-container').querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

// ===== RELIABLE WORD-BY-WORD ANIMATION =====
document.querySelectorAll('.animate-words').forEach(element => {
    // First make a copy of the original text
    const originalText = element.textContent;
    
    // Create a visible container for the animated text
    const animatedTextContainer = document.createElement('div');
    animatedTextContainer.className = 'animated-text-container';
    
    // Split text into words and spaces properly
    const wordsAndSpaces = originalText.split(/( )/).filter(item => item !== '');
    
    // Build the animated text
    wordsAndSpaces.forEach((item, index) => {
        const span = document.createElement('span');
        span.className = item === ' ' ? 'word-space' : 'word';
        span.textContent = item === ' ' ? '\u00A0' : item;
        animatedTextContainer.appendChild(span);
        
        // Animate only words (not spaces)
        if (item !== ' ') {
            gsap.from(span, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: index * 0.03,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }
    });
    
    // Replace the original element with our animated version
    element.replaceWith(animatedTextContainer);
});

    // ===== SPICE PARTICLES =====
    const spices = ['cardamom', 'turmeric', 'pepper', 'nutmeg'];
    const spiceContainer = document.querySelector('.spice-particles');
    
    for(let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'spice-particle';
        particle.style.backgroundImage = `url('../image/${spices[i%4]}-icon.png')`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.width = `${20 + Math.random() * 30}px`;
        particle.style.height = particle.style.width;
        spiceContainer.appendChild(particle);
    }

    // Spice hover effects
    document.querySelectorAll('.spice-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            const spice = item.getAttribute('data-spice');
            document.querySelectorAll('.spice-particle').forEach(particle => {
                if (particle.style.backgroundImage.includes(spice)) {
                    gsap.to(particle, {
                        scale: 1.5,
                        duration: 0.3
                    });
                }
            });
        });
        
        item.addEventListener('mouseleave', () => {
            document.querySelectorAll('.spice-particle').forEach(particle => {
                gsap.to(particle, {
                    scale: 1,
                    duration: 0.3
                });
            });
        });
    });

    // ===== INDIA MAP =====
    const map = L.map('india-map', {
        center: [20.5937, 78.9629],
        zoom: 5,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        scrollWheelZoom: false,
        tap: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 5,
        minZoom: 5
    }).addTo(map);

    // Add markers for key states
    const states = [
        {name: 'Karnataka', coords: [15.3173, 75.7139], color: '#e67e22'},
        {name: 'Rajasthan', coords: [27.0238, 74.2179], color: '#e67e22'},
        {name: 'Maharashtra', coords: [19.7515, 75.7139], color: '#e67e22'},
        {name: 'Bihar', coords: [25.0961, 85.3131], color: '#e67e22'},
        {name: 'Delhi', coords: [28.7041, 77.1025], color: '#e67e22'},
        {name: 'Odisha', coords: [20.9517, 85.0985], color: '#e67e22'}
    ];

    states.forEach(state => {
        const marker = L.marker(state.coords, {
            icon: L.divIcon({
                className: 'map-marker',
                html: `<div style="background-color:${state.color}" class="marker-pulse"></div>`,
                iconSize: [20, 20]
            })
        }).addTo(map);
        
        marker.getElement().addEventListener('mouseover', () => {
            gsap.to(marker.getElement(), {
                scale: 1.5,
                duration: 0.3
            });
        });
        
        marker.getElement().addEventListener('mouseout', () => {
            gsap.to(marker.getElement(), {
                scale: 1,
                duration: 0.3
            });
        });
    });

    // ===== FARMER STATS COUNTER =====
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;

        ScrollTrigger.create({
            trigger: counter,
            start: "top 80%",
            onEnter: () => {
                let current = 0;
                const updateCounter = () => {
                    if (current < target) {
                        counter.innerText = Math.ceil(current + increment);
                        current += increment;
                        setTimeout(updateCounter, 1);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            }
        });
    });

    // ===== HANDWRITTEN NOTE ANIMATION =====
    ScrollTrigger.create({
        trigger: "#farmers",
        start: "top center",
        onEnter: () => {
            document.querySelector('.handwritten-note').classList.add('visible');
        }
    });

    // ===== PARALLAX EFFECTS =====
    gsap.utils.toArray('.parallax-img').forEach(image => {
        gsap.to(image, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: image.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // ===== SECTION REVEAL ANIMATIONS =====
    gsap.utils.toArray('.content-wrapper').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });

    // ===== INITIALIZE GSAP SCROLLTRIGGER =====
    ScrollTrigger.refresh();
});