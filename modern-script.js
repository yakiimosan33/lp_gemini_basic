// Modern JavaScript for AI Creators Studio Landing Page

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navigation background on scroll
const nav = document.querySelector('.nav');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add background when scrolling down
    if (scrollTop > 50) {
        nav.style.backgroundColor = 'rgba(251, 253, 246, 0.98)';
        nav.style.borderBottom = '1px solid rgba(226, 232, 212, 0.8)';
    } else {
        nav.style.backgroundColor = 'rgba(251, 253, 246, 0.95)';
        nav.style.borderBottom = '1px solid transparent';
    }
    
    // Hide/show nav on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // Animate numbers
            if (entry.target.classList.contains('achievement-number')) {
                animateNumber(entry.target);
            }
            
            // Animate floating cards
            if (entry.target.classList.contains('floating-card')) {
                entry.target.style.animation = entry.target.style.animation + ', fadeInUp 0.6s ease forwards';
            }
        }
    });
}, observerOptions);

// Add animation classes to elements
document.querySelectorAll('.achievement-card, .content-card, .theme-card, .plan-card, .story-quote, .story-content').forEach(el => {
    el.classList.add('animate-fade-up');
    observer.observe(el);
});

// Observe achievement numbers
document.querySelectorAll('.achievement-number').forEach(el => {
    observer.observe(el);
});

// Observe floating cards
document.querySelectorAll('.floating-card').forEach(el => {
    observer.observe(el);
});

// Number animation function
function animateNumber(element) {
    const text = element.textContent;
    const numberMatch = text.match(/\d+/);
    
    if (!numberMatch) return;
    
    const endValue = parseInt(numberMatch[0]);
    const suffix = text.replace(numberMatch[0], '');
    const duration = 2000;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(endValue * easeOutQuart);
        
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Floating cards enhanced animation
function createFloatingAnimation() {
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach((card, index) => {
        // Initial position
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        // Animate in with delay
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
        
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Plan cards interaction
document.querySelectorAll('.plan-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('plan-featured')) {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('plan-featured')) {
            card.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Button ripple effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple element
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;
        
        // Add ripple styles if not already added
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                .btn {
                    position: relative;
                    overflow: hidden;
                }
            `;
            document.head.appendChild(style);
        }
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroPattern = document.querySelector('.hero-pattern');
    const heroGradient = document.querySelector('.hero-gradient');
    
    if (heroPattern) {
        heroPattern.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    if (heroGradient) {
        heroGradient.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Typewriter effect for hero title
function typewriterEffect() {
    const titleMain = document.querySelector('.title-main');
    if (!titleMain) return;
    
    const text = titleMain.textContent;
    titleMain.textContent = '';
    titleMain.style.borderRight = '3px solid var(--primary-600)';
    
    let index = 0;
    const timer = setInterval(() => {
        titleMain.textContent += text[index];
        index++;
        
        if (index >= text.length) {
            clearInterval(timer);
            setTimeout(() => {
                titleMain.style.borderRight = 'none';
            }, 1000);
        }
    }, 100);
}

// Enhanced loading animations
window.addEventListener('load', () => {
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Initialize floating cards animation
    setTimeout(() => {
        createFloatingAnimation();
    }, 1500);
    
    // Start typewriter effect
    setTimeout(() => {
        typewriterEffect();
    }, 1000);
});

// Badge animation
document.querySelectorAll('.hero-badge, .plan-badge').forEach(badge => {
    badge.addEventListener('mouseenter', () => {
        badge.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    badge.addEventListener('mouseleave', () => {
        badge.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Content cards stagger animation
const contentCards = document.querySelectorAll('.content-card');
contentCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// Achievement cards pulse animation
document.querySelectorAll('.achievement-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.achievement-icon');
        if (icon) {
            icon.style.animation = 'pulse 0.6s ease';
        }
    });
});

// Add pulse animation styles
const pulseStyles = document.createElement('style');
pulseStyles.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(pulseStyles);

// Theme cards interaction
document.querySelectorAll('.theme-card').forEach(card => {
    card.addEventListener('click', () => {
        card.style.animation = 'bounce 0.6s ease';
        setTimeout(() => {
            card.style.animation = '';
        }, 600);
    });
});

// Bounce animation
const bounceStyles = document.createElement('style');
bounceStyles.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        25% { transform: translateY(-10px); }
        50% { transform: translateY(0); }
        75% { transform: translateY(-5px); }
    }
`;
document.head.appendChild(bounceStyles);

// Scroll to top functionality
const scrollToTop = document.createElement('button');
scrollToTop.innerHTML = '↑';
scrollToTop.className = 'scroll-to-top';
scrollToTop.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: var(--primary-600);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    transform: scale(0);
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTop.style.opacity = '1';
        scrollToTop.style.transform = 'scale(1)';
    } else {
        scrollToTop.style.opacity = '0';
        scrollToTop.style.transform = 'scale(0)';
    }
});

scrollToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Scroll-dependent animations here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Mobile navigation functionality
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Update aria-label for accessibility
        const isOpen = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
        
        // Change icon
        const icon = navToggle.querySelector('.material-symbols-outlined');
        if (icon) {
            icon.textContent = isOpen ? 'close' : 'menu';
        }
    });

    // Close menu when clicking on links
    document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-label', 'メニューを開く');
            const icon = navToggle.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.textContent = 'menu';
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-label', 'メニューを開く');
            const icon = navToggle.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.textContent = 'menu';
            }
        }
    });
}

// Add mobile menu styles
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    @media (max-width: 768px) {
        .nav-toggle {
            display: block !important;
        }
        
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid var(--neutral-200);
            border-radius: 0 0 16px 16px;
            padding: 1rem;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
    }
`;
document.head.appendChild(mobileStyles);

// Video performance optimization
function optimizeVideoPlayback() {
    const video = document.querySelector('.hero-video');
    const overlay = document.querySelector('.hero-overlay');
    
    if (!video) return;

    // Check for save-data mode or slow connection
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSaveData = connection && connection.saveData;
    const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
    
    // Switch to static background if connection is poor
    if (isSaveData || isSlowConnection) {
        video.style.display = 'none';
        document.body.classList.add('static-bg-mode');
        
        // Create static background
        const staticBg = document.createElement('div');
        staticBg.className = 'hero-static-bg';
        staticBg.style.cssText = `
            position: absolute;
            top: 0; left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #6aa84f 0%, #7eb12b 100%);
            z-index: -1;
        `;
        video.parentNode.insertBefore(staticBg, video);
    }

    // Handle video loading errors
    video.addEventListener('error', () => {
        console.log('Video loading failed, switching to static background');
        video.style.display = 'none';
        document.body.classList.add('static-bg-mode');
    });

    // Lazy load video for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.load();
                observer.unobserve(video);
            }
        });
    });
    
    observer.observe(video);
}

// Initialize video optimization when page loads
document.addEventListener('DOMContentLoaded', optimizeVideoPlayback);

// FAQ Accordion functionality
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// Initialize FAQ when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initFAQAccordion();
});

console.log('AI Creators Studio Landing Page - Modern JavaScript loaded successfully! 🚀');

// Video debugging
document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.hero-video');
    if (video) {
        console.log('Video element found');
        
        video.addEventListener('loadeddata', () => {
            console.log('Video loaded successfully');
        });
        
        video.addEventListener('error', (e) => {
            console.error('Video loading error:', e);
        });
        
        video.addEventListener('canplay', () => {
            console.log('Video can play');
        });
        
        // Check video properties
        console.log('Video source:', video.querySelector('source').src);
        console.log('Video readyState:', video.readyState);
        console.log('Video networkState:', video.networkState);
    } else {
        console.error('Video element not found');
    }
});