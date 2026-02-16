// Wanderlust Escapes - JavaScript Functionality

// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Page Load Animation
window.addEventListener('load', function () {
    // Reset all animations to ensure clean state
    resetAllAnimations();

    // Hero Section Animation
    const tl = gsap.timeline();

    tl.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
    })
        .to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .to('.hero-cta', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.5");

    // Hero background parallax
    gsap.set('.hero-bg', { scale: 1.1 });
});

// Function to reset all animations and clear stuck states
function resetAllAnimations() {
    // Reset destination card images
    gsap.set('.destination-card img', {
        scale: 1,
        rotation: 0,
        x: 0,
        y: 0,
        clearProps: "transform"
    });

    // Reset destination cards
    gsap.set('.destination-card', {
        scale: 1,
        rotation: 0,
        rotationX: 0,
        rotationY: 0,
        x: 0,
        y: 0
    });

    // Clear any inline styles that might be causing issues
    document.querySelectorAll('.destination-card img').forEach(img => {
        img.style.transform = '';
        img.style.scale = '';
        img.style.translate = '';
        img.style.rotate = '';
    });
}

// Mobile Menu Toggle with Enhanced Animations
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
let isMenuOpen = false;

if (mobileMenuBtn && mobileMenu && menuIcon) {
    mobileMenuBtn.addEventListener('click', function (e) {
        e.preventDefault();
        toggleMobileMenu();
    });

    // Close menu when clicking on a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            closeMobileMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    if (isMenuOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    isMenuOpen = true;
    mobileMenu.classList.add('show');
    menuIcon.classList.add('active');

    // Animate button
    gsap.to(mobileMenuBtn, {
        scale: 1.1,
        duration: 0.2,
        ease: "power2.out"
    });

    // Animate menu items
    gsap.fromTo(mobileMenu.querySelectorAll('a'), {
        x: -30,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 0.3,
        stagger: 0.1,
        delay: 0.1,
        ease: "power2.out"
    });
}

function closeMobileMenu() {
    isMenuOpen = false;
    mobileMenu.classList.remove('show');
    menuIcon.classList.remove('active');

    // Reset button scale
    gsap.to(mobileMenuBtn, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
    });
}

// Navbar Background on Scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a[href^="#"], #mobile-menu a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            if (isMenuOpen) {
                closeMobileMenu();
            }

            // Add a small delay if coming from mobile menu
            const delay = isMenuOpen ? 300 : 0;

            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Add active state animation
                gsap.to(this, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                });
            }, delay);
        }
    });
});

// Parallax Effects
gsap.to('.hero-bg', {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
        trigger: "#hero",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

gsap.to('.experiences-bg', {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
        trigger: "#experiences",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

gsap.to('.booking-bg', {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
        trigger: "#booking",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

// About Section Animation
gsap.fromTo('.about-image', {
    x: -100,
    opacity: 0,
    rotationY: -15
}, {
    x: 0,
    opacity: 1,
    rotationY: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".about-image",
        start: "top 80%",
        toggleActions: "play none none reset"
    }
});

gsap.fromTo('.about-content', {
    x: 100,
    opacity: 0
}, {
    x: 0,
    opacity: 1,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".about-content",
        start: "top 80%",
        toggleActions: "play none none reset"
    }
});

// Destination Cards Sequential Animation
gsap.fromTo('.destination-card', {
    y: 100,
    opacity: 0,
    rotationX: 45
}, {
    y: 0,
    opacity: 1,
    rotationX: 0,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.2,
    scrollTrigger: {
        trigger: "#destinations",
        start: "top 70%",
        toggleActions: "play none none reset"
    }
});

// Experience Items Animation
gsap.fromTo('.experience-item', {
    y: 80,
    opacity: 0,
    scale: 0.8
}, {
    y: 0,
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.15,
    scrollTrigger: {
        trigger: "#experiences",
        start: "top 70%",
        toggleActions: "play none none reset"
    }
});

// Gallery Items Animation
gsap.fromTo('.gallery-item', {
    x: 100,
    opacity: 0
}, {
    x: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.1,
    scrollTrigger: {
        trigger: "#gallery",
        start: "top 80%",
        toggleActions: "play none none reset"
    }
});

// Booking Form Animation
gsap.fromTo('.booking-form', {
    y: 50,
    opacity: 0,
    scale: 0.95
}, {
    y: 0,
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".booking-form",
        start: "top 80%",
        toggleActions: "play none none reset"
    }
});

// Video Play Functionality
const playBtn = document.querySelector('.play-btn');
const videoContainer = document.getElementById('video-container');
const videoThumbnail = playBtn?.closest('.relative');

if (playBtn && videoContainer) {
    playBtn.addEventListener('click', function () {
        gsap.to(videoThumbnail, {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            ease: "power2.out",
            onComplete: function () {
                videoThumbnail.style.display = 'none';
                videoContainer.classList.remove('hidden');
                gsap.fromTo(videoContainer, {
                    opacity: 0,
                    scale: 0.8
                }, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });
    });
}

// Form Input Focus Effects
document.querySelectorAll('.booking-input').forEach(input => {
    input.addEventListener('focus', function () {
        gsap.to(this, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    input.addEventListener('blur', function () {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});



// Submit Button Ripple Effect
const submitBtn = document.querySelector('.submit-btn');
if (submitBtn) {
    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // Form validation
        const form = this.closest('form');
        const inputs = form.querySelectorAll('input[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                gsap.to(input, {
                    x: 10,
                    duration: 0.1,
                    ease: "power2.out",
                    yoyo: true,
                    repeat: 5
                });
            }
        });

        if (isValid) {
            // Success animation
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                ease: "power2.out",
                yoyo: true,
                repeat: 1,
                onComplete: function () {
                    // Show success message (placeholder)
                    alert('Thank you! We will contact you soon to plan your luxury escape.');
                }
            });
        }
    });
}

// Social Icons Bounce Animation
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function () {
        gsap.to(this, {
            y: -5,
            scale: 1.2,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    icon.addEventListener('mouseleave', function () {
        gsap.to(this, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Reset all destination card images to default state
document.querySelectorAll('.destination-card img').forEach(img => {
    gsap.set(img, {
        scale: 1,
        rotation: 0,
        x: 0,
        y: 0,
        clearProps: "all"
    });
});

// Destination Card Hover Effects
document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        gsap.killTweensOf(this);
        gsap.to(this, {
            y: -10,
            rotationX: 5,
            rotationY: 5,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out"
        });

        const img = this.querySelector('img');
        if (img) {
            gsap.killTweensOf(img);
            gsap.to(img, {
                scale: 1.1,
                duration: 0.4,
                ease: "power2.out"
            });
        }
    });

    card.addEventListener('mouseleave', function () {
        gsap.killTweensOf(this);
        gsap.to(this, {
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
        });

        const img = this.querySelector('img');
        if (img) {
            gsap.killTweensOf(img);
            gsap.to(img, {
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
            });
        }
    });
});

// Experience Icon Glow Effects
document.querySelectorAll('.experience-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        const icon = this.querySelector('.experience-icon');
        gsap.to(icon, {
            y: -5,
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
        });

        // Add glow effect
        icon.style.boxShadow = '0 0 30px rgba(245, 158, 11, 0.8)';
    });

    item.addEventListener('mouseleave', function () {
        const icon = this.querySelector('.experience-icon');
        gsap.to(icon, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });

        // Remove glow effect
        icon.style.boxShadow = '';
    });
});

// Gallery Smooth Scroll
const galleryContainer = document.querySelector('.gallery-container');
if (galleryContainer) {
    galleryContainer.addEventListener('wheel', function (e) {
        e.preventDefault();
        this.scrollLeft += e.deltaY;
    });
}

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-indicator';
document.body.appendChild(scrollProgress);

gsap.to(scrollProgress, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true
    }
});



// Preload critical images
const criticalImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2340&q=80',
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2340&q=80'
];

criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Intersection Observer for lazy loading
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Error Handling
window.addEventListener('error', function (e) {
    console.error('An error occurred:', e.error);
});



// Resize optimization
let resizeTimeout;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
        ScrollTrigger.refresh();
    }, 250);
});

console.log('Wanderlust Escapes - Website loaded successfully!');