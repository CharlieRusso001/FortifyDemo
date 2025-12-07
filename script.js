// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth scroll for navigation links
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

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(13, 40, 24, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(13, 40, 24, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Add parallax effect to hero section (only after initial animation completes)
let initialAnimationComplete = false;
setTimeout(() => {
    initialAnimationComplete = true;
}, 1500); // Wait for initial animations to complete

window.addEventListener('scroll', () => {
    if (!initialAnimationComplete) return;
    
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent && scrolled < 500) {
        const parallaxOffset = scrolled * 0.3;
        const opacity = Math.max(0, 1 - scrolled / 600);
        heroContent.style.transform = `translateY(${parallaxOffset}px)`;
        heroContent.style.opacity = opacity;
    }
});

// Animate feature cards on scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Redeem button hover effect is handled by CSS

// Image carousel with smooth fade in/out effect
const heroImages = document.querySelectorAll('.hero-image');
// Pick a random starting image index
let currentImageIndex = Math.floor(Math.random() * heroImages.length);
let carouselInterval = null;
const fadeDuration = 2500; // 2.5 seconds for smooth fade transition
const displayDuration = 4500; // 4.5 seconds fully visible
const firstImageDisplayDuration = 500; // 0.5 seconds for first image (much shorter)
const firstImageDelay = 800; // 0.8 seconds delay before first image appears (faster)

// Initialize images - start with random image
heroImages.forEach((img, index) => {
    img.classList.remove('active', 'fade-out');
    if (index === currentImageIndex) {
        // Random starting image starts visible faster
        setTimeout(() => {
            img.classList.add('active');
            
            // Start cycling to next image after shorter display duration
            setTimeout(() => {
                if (heroImages.length > 1) {
                    startCarousel();
                }
            }, firstImageDisplayDuration);
        }, firstImageDelay);
    }
});

function startCarousel() {
    if (heroImages.length <= 1) return;
    
    function cycleImages() {
        const currentImage = heroImages[currentImageIndex];
        
        // Start fade out current image
        currentImage.classList.add('fade-out');
        currentImage.classList.remove('active');
        
        // Move to next image
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        const nextImage = heroImages[currentImageIndex];
        
        // Start fade in new image simultaneously for smooth crossfade
        nextImage.classList.remove('fade-out');
        nextImage.classList.add('active');
        
        // Clean up previous image after fade completes
        setTimeout(() => {
            currentImage.classList.remove('fade-out');
        }, fadeDuration);
    }
    
    // Start cycling with normal display duration
    if (!carouselInterval) {
        carouselInterval = setInterval(cycleImages, displayDuration + fadeDuration);
    }
}

// Set current year in footer
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Email signup form handling
const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('emailInput');
const emailMessage = document.getElementById('emailMessage');

if (emailInput) {
    let typingTimeout;
    
    emailInput.addEventListener('input', () => {
        clearTimeout(typingTimeout);
        
        // Show message after user stops typing for 500ms
        typingTimeout = setTimeout(() => {
            if (emailInput.value.trim().length > 0) {
                emailMessage.textContent = 'We are not a functioning business yet';
                emailMessage.classList.add('show');
            } else {
                emailMessage.classList.remove('show');
            }
        }, 500);
    });
    
    emailInput.addEventListener('focus', () => {
        if (emailInput.value.trim().length > 0) {
            emailMessage.textContent = 'We are not a functioning business yet';
            emailMessage.classList.add('show');
        }
    });
    
    emailInput.addEventListener('blur', () => {
        if (emailInput.value.trim().length === 0) {
            emailMessage.classList.remove('show');
        }
    });
}

if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (email) {
            emailMessage.textContent = 'We are not a functioning business yet';
            emailMessage.classList.add('show');
            
            // Clear the input after showing message
            setTimeout(() => {
                emailInput.value = '';
                emailMessage.classList.remove('show');
            }, 3000);
        }
    });
}

// Start the carousel after a short delay to ensure page is loaded
if (heroImages.length > 0) {
    // Wait for images to load, then start carousel
    window.addEventListener('load', () => {
        // Carousel will start automatically with the first image
    });
}

