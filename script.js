/* ═══════════════════════════════════════════
   SINDHU ❤️ PRAVEEN — CINEMATIC JAVASCRIPT
   Every line of code carries love 💖
   ═══════════════════════════════════════════ */

// ─── PRELOADER ───
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('hidden');
        setTimeout(() => {
            document.getElementById('audio-prompt').classList.add('visible');
        }, 500);
    }, 2800);
});

// ─── START EXPERIENCE & CINEMATIC INTRO ───
let experienceInitialized = false;

document.getElementById('start-experience').addEventListener('click', () => {
    const prompt = document.getElementById('audio-prompt');
    prompt.classList.remove('visible');
    setTimeout(() => {
        prompt.style.display = 'none';
        startCinematicIntro();
    }, 600);
});

function triggerMainExperience() {
    if (experienceInitialized) return;
    experienceInitialized = true;

    const intro = document.getElementById('cinematic-intro');
    if (intro) {
        intro.classList.add('fade-out');
        setTimeout(() => {
            intro.style.display = 'none';
        }, 1500);
    }
    initExperience();
}

function startCinematicIntro() {
    const intro = document.getElementById('cinematic-intro');
    if (!intro) {
        triggerMainExperience();
        return;
    }

    intro.classList.add('active');

    const slides = intro.querySelectorAll('.intro-slide');
    const texts = intro.querySelectorAll('.intro-text');
    const skipBtn = document.getElementById('skip-intro');

    if (skipBtn) {
        skipBtn.addEventListener('click', () => {
            triggerMainExperience();
        });
    }

    // Sequence timeline for the 3 cinematic photos covering full screen
    const timeline = [
        { slideIndex: 0, textIndex: 0, duration: 4000 }, // New classroom board photo -> "A story written in the stars..."
        { slideIndex: 1, textIndex: 1, duration: 4000 }, // Graduation photo -> "A bond that can never break... ಅಕ್ಕ ಮತ್ತು ಅಣ್ಣ ❤️"
        { slideIndex: 2, textIndex: 2, duration: 4500 }  // College photo -> "Sindhu & Praveen"
    ];

    let step = 0;

    function playStep(index) {
        if (experienceInitialized) return;

        // Activate matching slide
        slides.forEach((slide, i) => {
            if (i === timeline[index].slideIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Activate matching text
        texts.forEach((text, i) => {
            if (i === timeline[index].textIndex) {
                text.classList.remove('exit');
                text.classList.add('visible');
            } else if (text.classList.contains('visible')) {
                text.classList.remove('visible');
                text.classList.add('exit');
            }
        });

        step++;
        if (step < timeline.length) {
            setTimeout(() => {
                playStep(step);
            }, timeline[index].duration);
        } else {
            setTimeout(() => {
                triggerMainExperience();
            }, timeline[index].duration);
        }
    }

    // Start trailer with gentle delay
    setTimeout(() => {
        playStep(0);
    }, 300);
}

function initHeroBackgroundSlider() {
    const heroSlides = document.querySelectorAll('.hero-bg-slide');
    if (heroSlides.length <= 1) return;
    let currentHeroIndex = 0;
    setInterval(() => {
        heroSlides[currentHeroIndex].classList.remove('active');
        currentHeroIndex = (currentHeroIndex + 1) % heroSlides.length;
        heroSlides[currentHeroIndex].classList.add('active');
    }, 6000);
}

function initExperience() {
    initParticles();
    initTypewriters();
    initSlideshow();
    initScrollAnimations();
    initSlideDots();
    initCounters();
    initHeroBackgroundSlider();
}

// ═══════════════════════════════════════════
// FLOATING PARTICLES
// ═══════════════════════════════════════════
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 80;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.3 - 0.2;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.hue = Math.random() > 0.5 ? 35 : 340; // gold or rose
            this.life = Math.random() * 200 + 100;
            this.maxLife = this.life;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life--;
            this.opacity = (this.life / this.maxLife) * 0.5;
            if (this.life <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${this.hue}, 70%, 70%)`;
            ctx.fill();
            // Glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = `hsl(${this.hue}, 70%, 70%)`;
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

// ═══════════════════════════════════════════
// TYPEWRITER EFFECTS
// ═══════════════════════════════════════════
function typeWriter(elementId, text, speed = 50, callback = null) {
    const element = document.getElementById(elementId);
    if (!element) return;
    let i = 0;
    element.innerHTML = '';
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.textContent = '|';
    element.appendChild(cursor);

    function type() {
        if (i < text.length) {
            const textNode = document.createTextNode(text.charAt(i));
            element.insertBefore(textNode, cursor);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                cursor.style.display = 'none';
                if (callback) callback();
            }, 2000);
        }
    }
    type();
}

let typewritersInitialized = false;

function initTypewriters() {
    if (typewritersInitialized) return;
    typewritersInitialized = true;

    // Hero name typewriter
    setTimeout(() => {
        typeWriter('typewriter-name', 'Praveen', 150, () => {
            // Hero subtitle typewriter
            typeWriter('typewriter-subtitle',
                'ಈ website ನಿನಗಾಗಿ ಮಾತ್ರ ಮಾಡಿದ್ದು... ಪ್ರೀತಿಯಿಂದ, ನಿನ್ನ ಅಕ್ಕನಿಂದ ❤️',
                40
            );
        });
    }, 500);

    // Message section typewriter - triggered by scroll
    const messageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    typeWriter('typewriter-message',
                        'ನನ್ನ ಪ್ರೀತಿಯ Praveen Anna, ನಿನಗೆ ಗೊತ್ತಾ... ನೀನು ನನ್ನ ಬದುಕಿನಲ್ಲಿ ಎಷ್ಟು ಮುಖ್ಯ ಅಂತ? ನೀನು ಇಲ್ಲದಿದ್ರೆ ನನ್ನ ಜೀವನ ಹೇಗಿರುತ್ತಿತ್ತು ಅಂತ ಯೋಚಿಸಲೂ ಆಗಲ್ಲ. ನೀನು ನನ್ನ ಅಣ್ಣ ಅನ್ನೋ ಹೆಮ್ಮೆ ನನಗೆ ಯಾವಾಗಲೂ ಇರುತ್ತೆ. ನಿನ್ನ ಜೊತೆ ಕಳೆದ ಪ್ರತಿ ಕ್ಷಣ ನನಗೆ ಅಮೂಲ್ಯ. ನೀನು ನನ್ನ ಜೀವ, ನನ್ನ ಶಕ್ತಿ, ನನ್ನ ಧೈರ್ಯ. I love you so much Anna! ❤️',
                        30
                    );
                }, 500);
                messageObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const msgSection = document.getElementById('message');
    if (msgSection) messageObserver.observe(msgSection);

    // Promise section typewriter
    const promiseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    typeWriter('typewriter-promise',
                        'Anna, ನಿನಗೆ ಒಂದು promise ಕೊಡ್ತೀನಿ — ಎಷ್ಟೇ ದೂರ ಹೋದ್ರೂ, ಎಷ್ಟೇ busy ಆದ್ರೂ, ನಿನ್ನ ಅಕ್ಕ ಯಾವಾಗಲೂ ನಿನ್ನ ಜೊತೆ ಇರ್ತಾಳೆ. ನಿನಗೆ ಯಾವಾಗ ಬೇಕಾದ್ರೂ call ಮಾಡು, ನಾನು ಅಲ್ಲಿರ್ತೀನಿ. ❤️',
                        35
                    );
                }, 500);
                promiseObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const promiseSection = document.getElementById('promise');
    if (promiseSection) promiseObserver.observe(promiseSection);
}

// ═══════════════════════════════════════════
// SCROLL ANIMATIONS
// ═══════════════════════════════════════════
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ═══════════════════════════════════════════
// ANIMATED COUNTERS
// ═══════════════════════════════════════════
function initCounters() {
    const counterElements = document.querySelectorAll('.counter-number');
    let countersStarted = false;

    const countersObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                counterElements.forEach(counter => {
                    const targetAttr = counter.getAttribute('data-target');
                    if (targetAttr === 'infinity') {
                        counter.textContent = '∞';
                        return;
                    }

                    const target = parseInt(targetAttr, 10);
                    const suffix = counter.getAttribute('data-suffix') || '';
                    if (isNaN(target)) return;

                    const duration = 2200;
                    const startTime = performance.now();

                    function updateCount(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeProgress = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(easeProgress * target);

                        counter.textContent = current.toLocaleString('en-US') + suffix;

                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.textContent = target.toLocaleString('en-US') + suffix;
                        }
                    }

                    requestAnimationFrame(updateCount);
                });
                countersObserver.disconnect();
            }
        });
    }, { threshold: 0.25 });

    const countersSection = document.getElementById('counters');
    if (countersSection) {
        countersObserver.observe(countersSection);
    }
}

// ═══════════════════════════════════════════
// VOICE MESSAGES
// ═══════════════════════════════════════════
let currentPlayingAudio = null;
let currentPlayingBtn = null;
let currentPlayingCard = null;

function toggleVoice(audioId, btn) {
    const audio = document.getElementById(audioId);
    const card = btn.closest('.voice-card');
    const progressBar = document.getElementById('progress-' + audioId);

    // If another audio is playing, stop it
    if (currentPlayingAudio && currentPlayingAudio !== audio) {
        currentPlayingAudio.pause();
        currentPlayingAudio.currentTime = 0;
        if (currentPlayingBtn) currentPlayingBtn.classList.remove('playing');
        if (currentPlayingCard) currentPlayingCard.classList.remove('playing');
    }

    if (audio.paused) {
        audio.play();
        btn.classList.add('playing');
        card.classList.add('playing');
        currentPlayingAudio = audio;
        currentPlayingBtn = btn;
        currentPlayingCard = card;

        // Update progress
        audio.addEventListener('timeupdate', function updateProgress() {
            const progress = (audio.currentTime / audio.duration) * 100;
            if (progressBar) progressBar.style.width = progress + '%';
        });

        audio.addEventListener('ended', function onEnd() {
            btn.classList.remove('playing');
            card.classList.remove('playing');
            if (progressBar) progressBar.style.width = '0%';
            currentPlayingAudio = null;
            currentPlayingBtn = null;
            currentPlayingCard = null;
            audio.removeEventListener('ended', onEnd);
        });
    } else {
        audio.pause();
        btn.classList.remove('playing');
        card.classList.remove('playing');
        currentPlayingAudio = null;
        currentPlayingBtn = null;
        currentPlayingCard = null;
    }
}

// ═══════════════════════════════════════════
// SLIDESHOW
// ═══════════════════════════════════════════
let currentSlide = 0;
let slideInterval = null;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function initSlideDots() {
    const dotsContainer = document.getElementById('slide-dots');
    if (!dotsContainer) return;
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    const dots = document.querySelectorAll('.slide-dot');
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
    currentSlide = index;
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    goToSlide(currentSlide + direction);
    resetSlideInterval();
}

function initSlideshow() {
    slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
}

// ═══════════════════════════════════════════
// CONFETTI SYSTEM
// ═══════════════════════════════════════════
function triggerFinale() {
    launchConfetti();
    launchFloatingHearts();

    // Make the button shine
    const btn = document.getElementById('surprise-btn');
    btn.style.background = 'linear-gradient(135deg, #ffd700, #ff69b4, #ffd700)';
    btn.innerHTML = '<span>🎉 I LOVE YOU ANNA! 🎉</span>';
}

function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const colors = ['#ffd700', '#ff69b4', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#e056fd', '#686de0', '#ff9ff3', '#feca57'];
    const shapes = ['circle', 'rect', 'star'];

    for (let i = 0; i < 300; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            speedX: (Math.random() - 0.5) * 6,
            speedY: Math.random() * 4 + 2,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            opacity: 1,
            decay: Math.random() * 0.003 + 0.001
        });
    }

    function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx, y = cy;
        let step = Math.PI / spikes;
        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;
            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
    }

    let animationFrame;
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;

        confettiPieces.forEach(p => {
            if (p.opacity <= 0) return;
            alive = true;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = p.color;

            if (p.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.shape === 'rect') {
                ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
            } else {
                drawStar(ctx, 0, 0, 5, p.size, p.size / 2);
                ctx.fill();
            }

            ctx.restore();

            p.x += p.speedX;
            p.y += p.speedY;
            p.speedY += 0.05;
            p.rotation += p.rotationSpeed;
            p.opacity -= p.decay;
        });

        if (alive) {
            animationFrame = requestAnimationFrame(animateConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cancelAnimationFrame(animationFrame);
        }
    }
    animateConfetti();
}

function launchFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    container.classList.add('active');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💞', '🧡', '💛', '🤎', '💜', '🩷', '♥️'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.className = 'floating-heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
            heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
            heart.style.animationDelay = '0s';
            container.appendChild(heart);

            setTimeout(() => heart.remove(), 7000);
        }, i * 100);
    }

    setTimeout(() => {
        container.classList.remove('active');
    }, 8000);
}

// ═══════════════════════════════════════════
// PARALLAX EFFECT
// ═══════════════════════════════════════════
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxBgs = document.querySelectorAll('.section-bg');
    parallaxBgs.forEach(bg => {
        const section = bg.parentElement;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
            const yPos = ((scrolled - sectionTop) * 0.3);
            bg.style.transform = `scale(1.1) translateY(${yPos}px)`;
        }
    });
});

// ═══════════════════════════════════════════
// LOVE COUNTER ANIMATION
// ═══════════════════════════════════════════
const loveObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const loveElement = document.getElementById('love-counter');
            if (loveElement) {
                let count = 0;
                const maxCount = 12;
                const words = ['ತುಂಬಾ ', 'ತುಂಬಾ ', 'ತುಂಬಾ ', 'ತುಂಬಾ '];
                let text = '';
                const interval = setInterval(() => {
                    text += words[count % words.length];
                    loveElement.textContent = text;
                    count++;
                    if (count >= maxCount) {
                        clearInterval(interval);
                        loveElement.textContent = text + '❤️';
                    }
                }, 200);
            }
            loveObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const finaleSection = document.getElementById('finale');
if (finaleSection) loveObserver.observe(finaleSection);

// ═══════════════════════════════════════════
// CURSOR TRAIL EFFECT
// ═══════════════════════════════════════════
document.addEventListener('mousemove', (e) => {
    // Subtle golden trail on mouse move
    if (Math.random() > 0.92) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 5px;
            height: 5px;
            background: radial-gradient(circle, rgba(212, 165, 116, 0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            animation: fadeOut 1s ease forwards;
        `;
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 1000);
    }
});

// Add fadeOut animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(3); }
    }
`;
document.head.appendChild(style);

// ═══════════════════════════════════════════
// SMOOTH REVEAL ON SECTIONS
// ═══════════════════════════════════════════
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transition = 'opacity 1.5s ease';
    sectionObserver.observe(section);
});

// ═══════════════════════════════════════════
// SINDHU'S HANDWRITTEN LETTERS INTERACTIONS
// ═══════════════════════════════════════════
function switchLetterTab(tabId, btn) {
    // Update active tab button
    document.querySelectorAll('.letter-tab').forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // Update active letter panel
    document.querySelectorAll('.letter-panel').forEach(p => p.classList.remove('active'));
    const targetPanel = document.getElementById('panel-' + tabId);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
}

function openLetterModal(imgSrc, caption) {
    const modal = document.getElementById('letter-modal');
    const modalImg = document.getElementById('letter-modal-img');
    const modalCaption = document.getElementById('letter-modal-caption');

    if (modal && modalImg) {
        modalImg.src = imgSrc;
        if (modalCaption) modalCaption.textContent = caption || 'Handwritten Letter';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLetterModal() {
    const modal = document.getElementById('letter-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close letter modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLetterModal();
    }
});
