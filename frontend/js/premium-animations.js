/**
 * AFODAMS PROPERTY - PREMIUM ANIMATIONS & INTERACTIONS
 * World-Class Luxury Real Estate Platform
 * Advanced animations without external libraries (Vanilla JS)
 */

class PremiumAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Initialize all premium features
        this.setupScrollAnimations();
        this.setupParallax();
        this.setupHoverEffects();
        this.setupLazyLoading();
        this.setupCounterAnimations();
        this.setupSmoothScroll();
        this.setupCursorEffects();
        this.setupImageHoverZoom();
        this.setupFormAnimations();
        this.setupNavbarScroll();
        console.log('🎨 Premium animations initialized');
    }

    /**
     * SCROLL ANIMATIONS
     * Elements fade in as they enter viewport
     */
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation delay
                    setTimeout(() => {
                        entry.target.classList.add('animate-fade-in-up');
                        entry.target.style.opacity = '1';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with data-animate attribute
        document.querySelectorAll('[data-animate]').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    /**
     * PARALLAX EFFECT
     * Background images move slower than foreground
     */
    setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach(el => {
                const speed = el.dataset.parallax || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    /**
     * PROPERTY CARD HOVER EFFECTS
     * 3D tilt effect on property cards
     */
    setupHoverEffects() {
        const cards = document.querySelectorAll('.property-card-premium');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    /**
     * LAZY LOADING IMAGES
     * Load images only when they enter viewport
     */
    setupLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src;

                    if (src) {
                        // Create a temporary image to load
                        const tempImg = new Image();
                        tempImg.onload = () => {
                            img.src = src;
                            img.classList.add('loaded');
                            img.classList.remove('skeleton');
                        };
                        tempImg.src = src;
                    }

                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            img.classList.add('skeleton');
            imageObserver.observe(img);
        });
    }

    /**
     * COUNTER ANIMATIONS
     * Animate numbers counting up
     */
    setupCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');

        const animateCounter = (element) => {
            const target = parseInt(element.dataset.counter);
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    element.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target.toLocaleString();
                }
            };

            updateCounter();
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    /**
     * SMOOTH SCROLL
     * Smooth scrolling for anchor links
     */
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href !== '') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    /**
     * PREMIUM CURSOR EFFECTS
     * Custom cursor with trailing effect
     */
    setupCursorEffects() {
        // Only on desktop
        if (window.innerWidth < 768) return;

        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #D4AF37;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);

        const cursorTrail = document.createElement('div');
        cursorTrail.className = 'cursor-trail';
        cursorTrail.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: #D4AF37;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(cursorTrail);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let trailX = 0, trailY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            // Smooth cursor following
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;

            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;

            cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
            cursorTrail.style.transform = `translate(${trailX - 4}px, ${trailY - 4}px)`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        // Scale cursor on hover
        document.querySelectorAll('a, button, .btn-premium').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = `translate(${cursorX - 15}px, ${cursorY - 15}px) scale(1.5)`;
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px) scale(1)`;
            });
        });
    }

    /**
     * IMAGE HOVER ZOOM
     * Zoom effect on image hover
     */
    setupImageHoverZoom() {
        const imageWrappers = document.querySelectorAll('.property-image-wrapper');

        imageWrappers.forEach(wrapper => {
            const img = wrapper.querySelector('img');
            if (!img) return;

            wrapper.addEventListener('mousemove', (e) => {
                const rect = wrapper.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;

                img.style.transformOrigin = `${x}% ${y}%`;
            });
        });
    }

    /**
     * FORM ANIMATIONS
     * Floating label effect for inputs
     */
    setupFormAnimations() {
        const inputs = document.querySelectorAll('.form-premium input, .form-premium textarea');

        inputs.forEach(input => {
            // Floating label effect
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (input.value === '') {
                    input.parentElement.classList.remove('focused');
                }
            });

            // Ripple effect on focus
            input.addEventListener('focus', (e) => {
                const ripple = document.createElement('span');
                ripple.className = 'input-ripple';
                ripple.style.cssText = `
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    width: 0;
                    height: 2px;
                    background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
                    transform: translateX(-50%);
                    transition: width 0.3s ease;
                `;
                input.parentElement.appendChild(ripple);

                setTimeout(() => {
                    ripple.style.width = '100%';
                }, 10);
            });
        });
    }

    /**
     * NAVBAR SCROLL EFFECT
     * Change navbar style on scroll
     */
    setupNavbarScroll() {
        const navbar = document.querySelector('.navbar, nav');
        if (!navbar) return;

        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Add shadow when scrolled
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.boxShadow = 'none';
                navbar.style.background = 'white';
            }

            // Hide navbar on scroll down, show on scroll up
            if (currentScroll > lastScroll && currentScroll > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            navbar.style.transition = 'all 0.3s ease';
            lastScroll = currentScroll;
        });
    }

    /**
     * BUTTON RIPPLE EFFECT
     * Material design ripple on button click
     */
    static addRippleEffect(button) {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    }

    /**
     * TOAST NOTIFICATION
     * Premium toast notifications
     */
    static showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast-premium toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
            </div>
            <div class="toast-message">${message}</div>
        `;

        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #D4AF37 0%, #FFA500 100%)' : '#FF4444'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 10000;
            animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
        `;

        document.body.appendChild(toast);

        setTimeout(() => toast.remove(), 3000);
    }

    /**
     * LOADING SKELETON
     * Show loading skeleton while content loads
     */
    static createSkeleton(container) {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton-loader';
        skeleton.innerHTML = `
            <div class="skeleton skeleton-image"></div>
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text"></div>
        `;
        container.appendChild(skeleton);
        return skeleton;
    }
}

// Add required CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .loaded {
        animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PremiumAnimations();
    });
} else {
    new PremiumAnimations();
}

// Export for use in other scripts
window.PremiumAnimations = PremiumAnimations;

// Add ripple effect to all premium buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-premium, .btn-gold, .btn-luxury').forEach(button => {
        PremiumAnimations.addRippleEffect(button);
    });
});
