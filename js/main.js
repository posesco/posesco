/**
 * Main JavaScript File
 * Handles core functionality and interactions
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded successfully! 🚀');
    
    // Initialize all features
    initSmoothScroll();
    initLazyLoading();
    trackExternalLinks();
    addAccessibilityFeatures();
});

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Lazy loading for sections (Intersection Observer)
 */
function initLazyLoading() {
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

/**
 * Track external link clicks (for analytics)
 */
function trackExternalLinks() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const linkText = this.textContent;
            const linkHref = this.href;
            console.log(`External link clicked: ${linkText} (${linkHref})`);
            // Here you could add analytics tracking (Google Analytics, etc.)
        });
    });
}

/**
 * Add accessibility features
 */
function addAccessibilityFeatures() {
    // Add focus visible class for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
}

/**
 * Add dynamic year to copyright
 */
function updateCopyrightYear() {
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = `© ${currentYear} Jesús David Posada Escobar`;
    }
}

// Update copyright year on load
updateCopyrightYear();

/**
 * Console easter egg
 */
console.log(`
╔═══════════════════════════════════════════════╗
║                                               ║
║   👋 Hi there, fellow developer!             ║
║                                               ║
║   Interested in the code?                    ║
║   Check out the repo:                        ║
║   https://github.com/posesco                 ║
║                                               ║
║   Let's connect! 🚀                          ║
║                                               ║
╚═══════════════════════════════════════════════╝
`);