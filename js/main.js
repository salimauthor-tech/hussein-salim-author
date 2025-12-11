// Hussein Salim Author Website - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Hussein Salim Author Website loaded successfully!');

    // ======================
    // 1. LOADING SCREEN
    // ======================
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Remove from DOM after animation completes
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.remove();
                }
            }, 500);
        }, 1000);
    });

    // ======================
    // 2. MOBILE NAVIGATION
    // ======================
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

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // ======================
    // 3. SMOOTH SCROLLING
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#' || targetId === '#home') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(targetId);
                
                if (target) {
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                    }
                    
                    // Calculate header height for offset
                    const headerHeight = 80;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    // ======================
    // 4. NAVBAR BACKGROUND ON SCROLL
    // ======================
    const navbar = document.getElementById('navbar');
    
    function updateNavbar() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Initial check

    // ======================
    // 5. SCROLL ANIMATION
    // ======================
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
    };
    
    // Initialize scroll animation
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); // Check on load

    // ======================
    // 6. BOOK 3D EFFECT
    // ======================
    const bookCover = document.querySelector('.book-cover-3d');
    let isRotating = false;
    
    if (bookCover) {
        // Mouse move effect
        bookCover.addEventListener('mousemove', (e) => {
            if (isRotating) return;
            
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            bookCover.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale(1.05)`;
            bookCover.style.transition = 'transform 0.1s ease';
        });

        // Mouse leave effect
        bookCover.addEventListener('mouseleave', () => {
            if (isRotating) return;
            
            bookCover.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
            bookCover.style.transition = 'transform 0.5s ease';
        });

        // Touch device support
        bookCover.addEventListener('touchmove', (e) => {
            if (isRotating) return;
            
            const touch = e.touches[0];
            const xAxis = (window.innerWidth / 2 - touch.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - touch.pageY) / 25;
            
            bookCover.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale(1.05)`;
            bookCover.style.transition = 'transform 0.1s ease';
        });

        bookCover.addEventListener('touchend', () => {
            if (isRotating) return;
            
            bookCover.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
            bookCover.style.transition = 'transform 0.5s ease';
        });
    }

    // Rotate book button
    const rotateButton = document.getElementById('rotateBook');
    if (rotateButton) {
        rotateButton.addEventListener('click', function() {
            if (!bookCover) return;
            
            isRotating = !isRotating;
            
            if (isRotating) {
                bookCover.style.transform = 'rotateY(180deg) rotateX(10deg) scale(1.05)';
                bookCover.style.transition = 'transform 1s ease';
                rotateButton.innerHTML = '<i class="fas fa-sync-alt"></i> Stop Rotation';
            } else {
                bookCover.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
                bookCover.style.transition = 'transform 0.5s ease';
                rotateButton.innerHTML = '<i class="fas fa-sync-alt"></i> Rotate View';
            }
        });
    }

    // ======================
    // 7. AUTHOR STATS COUNTER
    // ======================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16); // 60fps
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    function checkCounter() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const rect = stat.getBoundingClientRect();
            
            if (rect.top < window.innerHeight - 100 && !stat.hasAttribute('data-animated')) {
                stat.setAttribute('data-animated', 'true');
                animateCounter(stat, target, 2000);
            }
        });
    }
    
    window.addEventListener('scroll', checkCounter);
    checkCounter(); // Check on load

    // ======================
    // 8. CONTACT FORM - NETLIFY FORMS
    // ======================
    const contactForm = document.querySelector('.contact-form');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            const formData = new FormData(this);
            
            // Basic validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('input[required], textarea[required], select[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--error-red)';
                    
                    // Reset border color on input
                    field.addEventListener('input', function() {
                        this.style.borderColor = 'rgba(201, 179, 136, 0.3)';
                    }, { once: true });
                }
            });
            
            if (!isValid) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Netlify Forms submission
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success
                    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                    formStatus.className = 'form-status success';
                    formStatus.style.display = 'block';
                    
                    // Show notification
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    
                    // Reset form
                    this.reset();
                    
                    // Scroll to show success message
                    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                } else {
                    // Error
                    const data = await response.json();
                    let errorMessage = 'Oops! Something went wrong. Please try again.';
                    
                    if (data.errors) {
                        errorMessage = data.errors.map(error => error.message).join(', ');
                    }
                    
                    formStatus.textContent = errorMessage;
                    formStatus.className = 'form-status error';
                    formStatus.style.display = 'block';
                    
                    showNotification(errorMessage, 'error');
                }
            } catch (error) {
                // Network error
                console.error('Form submission error:', error);
                
                formStatus.textContent = 'Network error. Please check your connection and try again.';
                formStatus.className = 'form-status error';
                formStatus.style.display = 'block';
                
                showNotification('Network error. Please check your connection.', 'error');
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Re-enable button after 3 seconds in case of silent failure
                setTimeout(() => {
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }

    // ======================
    // 9. NOTIFICATION SYSTEM
    // ======================
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.custom-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `custom-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
                </span>
                <span class="notification-text">${message}</span>
            </div>
        `;

        // Add to body
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    // Add notification styles
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .custom-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--dark-base);
            border: 1px solid rgba(201, 179, 136, 0.3);
            border-radius: 0.5rem;
            padding: 1rem 1.5rem;
            color: var(--text-light);
            font-weight: 500;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            transform: translateX(120%);
            transition: transform 0.3s ease;
            z-index: 9999;
            max-width: 400px;
            backdrop-filter: blur(10px);
        }
        
        .custom-notification.show {
            transform: translateX(0);
        }
        
        .custom-notification.success {
            border-color: rgba(16, 185, 129, 0.3);
            background: rgba(16, 185, 129, 0.1);
        }
        
        .custom-notification.error {
            border-color: rgba(239, 68, 68, 0.3);
            background: rgba(239, 68, 68, 0.1);
        }
        
        .custom-notification.info {
            border-color: rgba(201, 179, 136, 0.3);
            background: rgba(201, 179, 136, 0.1);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification-icon {
            font-size: 1.25rem;
            font-weight: bold;
        }
        
        .notification-text {
            flex: 1;
        }
    `;
    document.head.appendChild(notificationStyles);

    // ======================
    // 10. BACK TO TOP BUTTON
    // ======================
    const backToTopBtn = document.getElementById('backToTop');
    
    function updateBackToTop() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    if (backToTopBtn) {
        window.addEventListener('scroll', updateBackToTop);
        updateBackToTop(); // Initial check
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ======================
    // 11. SAMPLE CHAPTER REQUEST
    // ======================
    const sampleButtons = document.querySelectorAll('.request-sample');
    
    sampleButtons.forEach(button => {
        button.addEventListener('click', function() {
            showNotification('Redirecting to sample request form...', 'info');
            
            // Simulate redirect
            setTimeout(() => {
                // In a real implementation, this would open a modal or redirect
                // For now, we'll just show a notification
                showNotification('Sample chapter request feature coming soon! Please use the contact form for now.', 'info');
            }, 500);
        });
    });

    // ======================
    // 12. BLOG READ MORE BUTTONS
    // ======================
    const readMoreButtons = document.querySelectorAll('.blog-read-more');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const blogCard = this.closest('.blog-card');
            const title = blogCard.querySelector('.blog-title').textContent;
            
            showNotification(`Opening blog post: "${title}"`, 'info');
            
            // Simulate opening blog post
            setTimeout(() => {
                showNotification('Blog feature coming soon!', 'info');
            }, 500);
        });
    });

    // ======================
    // 13. UPDATE COPYRIGHT YEAR
    // ======================
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // ======================
    // 14. PARTICLE ANIMATION
    // ======================
    function createParticles() {
        const container = document.querySelector('.hero-background');
        if (!container) return;

        // Remove existing dynamic particles
        const existingParticles = document.querySelectorAll('.dynamic-particle');
        existingParticles.forEach(particle => particle.remove());

        // Create new particles for mobile/desktop
        const particleCount = window.innerWidth < 768 ? 8 : 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle', 'dynamic-particle');
            
            // Random properties
            const size = Math.random() * 60 + 20;
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

    // Recreate particles on resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(createParticles, 250);
    });

    // ======================
    // 15. ZOOM BOOK BUTTON
    // ======================
    const zoomButton = document.getElementById('zoomBook');
    if (zoomButton) {
        zoomButton.addEventListener('click', function() {
            showNotification('Zoom feature coming soon!', 'info');
        });
    }

    // ======================
    // 16. INITIALIZE ALL COMPONENTS
    // ======================
    console.log('Website initialized successfully!');
});
