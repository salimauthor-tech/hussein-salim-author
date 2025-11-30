// Hussein Salim Author Website - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    console.log('Hussein Salim Author Website 2025 loaded successfully!');

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
                
                // Smooth scroll to target
                const headerHeight = 80;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Scroll Animation
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    }
    
    // Initialize scroll animation
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Book Cover 3D Effect Enhancement
    const bookCover = document.querySelector('.book-cover-3d');
    if (bookCover) {
        bookCover.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            bookCover.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale(1.05)`;
        });

        bookCover.addEventListener('mouseleave', () => {
            bookCover.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
        });
    }

    // Action Buttons
    document.querySelectorAll('.book-purchase').forEach(button => {
        button.addEventListener('click', function() {
            showNotification('Redirecting to purchase page...', 'info');
            setTimeout(() => {
                window.open('https://example.com/purchase-the-phoenix-covenant', '_blank');
            }, 1000);
        });
    });
    
    document.querySelectorAll('.book-sample').forEach(button => {
        button.addEventListener('click', function() {
            showNotification('Opening sample chapter...', 'info');
            setTimeout(() => {
                window.open('/samples/the-phoenix-covenant-sample.pdf', '_blank');
            }, 1000);
        });
    });
    
    document.querySelectorAll('.book-goodreads').forEach(button => {
        button.addEventListener('click', function() {
            showNotification('Opening Goodreads...', 'info');
            setTimeout(() => {
                window.open('https://goodreads.com/author/hussein-salim', '_blank');
            }, 1000);
        });
    });
    
    document.querySelectorAll('.blog-read-more').forEach(button => {
        button.addEventListener('click', function() {
            showNotification('Opening blog post...', 'info');
        });
    });
    
    document.querySelectorAll('.speaker-kit').forEach(button => {
        button.addEventListener('click', function() {
            showNotification('Downloading speaker kit...', 'info');
            setTimeout(() => {
                window.open('/downloads/speaker-kit.pdf', '_blank');
            }, 1000);
        });
    });

    // Social Media Links
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-social');
            const urls = {
                'facebook': 'https://facebook.com/husseinsalimauthor',
                'twitter': 'https://twitter.com/husseinsalim',
                'instagram': 'https://instagram.com/husseinsalim',
                'linkedin': 'https://linkedin.com/in/husseinsalim',
                'goodreads': 'https://goodreads.com/author/hussein-salim'
            };
            
            if (urls[platform]) {
                window.open(urls[platform], '_blank');
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitButton = this.querySelector('.contact-submit');
            
            // Basic validation
            let isValid = true;
            this.querySelectorAll('input[required], textarea[required]').forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                } else {
                    field.style.borderColor = 'rgba(201, 179, 136, 0.3)';
                }
            });
            
            if (!isValid) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Simulate form submission
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you for your message! I will get back to you soon.', 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Particle System Enhancement
    function createParticles() {
        const container = document.querySelector('.hero-background');
        if (!container) return;

        // Remove existing particles
        const existingParticles = document.querySelectorAll('.dynamic-particle');
        existingParticles.forEach(particle => particle.remove());

        // Create new particles
        const particleCount = 15;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle', 'dynamic-particle');
            
            // Random properties
            const size = Math.random() * 80 + 20;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
            particle.style.opacity = Math.random() * 0.4 + 0.1;
            
            container.appendChild(particle);
        }
    }

    // Initialize particles
    createParticles();

    // Notification System
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.custom-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create new notification
        const notification = document.createElement('div');
        notification.className = `custom-notification fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
            type === 'error' ? 'bg-red-600 text-white' :
            type === 'success' ? 'bg-green-600 text-white' :
            'bg-metallic-gold text-dark-base'
        }`;
        notification.textContent = message;
        notification.style.zIndex = '9999';

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    // Initial scroll animation check
    handleScrollAnimation();
});