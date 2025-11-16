/**
 * Animations and Interactive Effects
 */

document.addEventListener('DOMContentLoaded', function() {
    initCardAnimations();
    initHeaderAnimation();
    initSkillsAnimation();
    addParallaxEffect();
});

/**
 * Animate cards on hover with stagger effect
 */
function initCardAnimations() {
    const cards = document.querySelectorAll('.highlight-card, .tech-item, .method-card');
    
    cards.forEach((card, index) => {
        // Stagger initial animation
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Add subtle tilt effect on hover
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

/**
 * Animate header elements on page load
 */
function initHeaderAnimation() {
    const header = document.querySelector('header');
    const h1 = header.querySelector('h1');
    const subtitle = header.querySelector('.subtitle');
    const intro = header.querySelector('.intro');
    const certification = header.querySelector('.certification');
    
    // Fade in sequence
    setTimeout(() => h1.classList.add('fade-in'), 100);
    setTimeout(() => subtitle.classList.add('fade-in'), 300);
    setTimeout(() => intro.classList.add('fade-in'), 500);
    setTimeout(() => certification.classList.add('fade-in'), 700);
}

/**
 * Animate skills when they come into view
 */
function initSkillsAnimation() {
    const techItems = document.querySelectorAll('.tech-item');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('skill-reveal');
            }
        });
    }, observerOptions);
    
    techItems.forEach(item => {
        observer.observe(item);
    });
}

/**
 * Parallax effect for header
 */
function addParallaxEffect() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        if (header && scrolled < 400) {
            header.style.transform = `translateY(${rate}px)`;
            header.style.opacity = 1 - (scrolled / 400);
        }
    });
}

/**
 * Add typing effect to subtitle
 */
function addTypingEffect() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';
    
    let index = 0;
    const typingSpeed = 50;
    
    function type() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        }
    }
    
    setTimeout(type, 500);
}

/**
 * Badge pulse animation
 */
function initBadgeAnimation() {
    const badges = document.querySelectorAll('.badge');
    
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s ease';
        });
        
        badge.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
}

// Initialize badge animation
initBadgeAnimation();

/**
 * Add CSS for animations
 */
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .skill-reveal {
        animation: slideInLeft 0.5s ease forwards;
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
    
    .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 100;
    }
    
    .skip-link:focus {
        top: 0;
    }
    
    body.keyboard-navigation *:focus {
        outline: 3px solid var(--primary-color);
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);