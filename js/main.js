// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Hussein Salim Author Website - Enhanced Version Loaded');
    
    // ===== LOADING SCREEN =====
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Initialize other components after loading
        initializeWebsite();
    }, 1500);
    
    function initializeWebsite() {
        // ===== THEME TOGGLE =====
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');
        
        // Check for saved theme or prefer-color-scheme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
        
        // Apply saved theme
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
        
        function updateThemeIcon(theme) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        // ===== MOBILE NAVIGATION =====
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
            
            // Close menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }
        
        // ===== SMOOTH SCROLLING =====
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    // Calculate scroll position
                    const headerHeight = 80;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    // Smooth scroll
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // ===== NAVBAR BACKGROUND ON SCROLL =====
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(250, 243, 224, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                
                if (document.documentElement.getAttribute('data-theme') === 'dark') {
                    navbar.style.background = 'rgba(26, 18, 11, 0.98)';
                }
            } else {
                navbar.style.background = '';
                navbar.style.boxShadow = '';
            }
            
            // Show/hide back to top button
            const backToTop = document.getElementById('backToTop');
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        // ===== BACK TO TOP BUTTON =====
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // ===== PARTICLE BACKGROUND =====
        const canvas = document.getElementById('particleCanvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let particles = [];
            
            // Set canvas size
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                initParticles();
            }
            
            // Create particles
            function initParticles() {
                particles = [];
                const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000));
                
                for (let i = 0; i < particleCount; i++) {
                    particles.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        size: Math.random() * 3 + 1,
                        speedX: (Math.random() - 0.5) * 0.5,
                        speedY: (Math.random() - 0.5) * 0.5,
                        color: `rgba(139, 69, 19, ${Math.random() * 0.3 + 0.1})`
                    });
                }
            }
            
            // Animate particles
            function animateParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Update and draw particles
                particles.forEach(particle => {
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;
                    
                    // Bounce off edges
                    if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                    if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
                    
                    // Draw particle
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color;
                    ctx.fill();
                    
                    // Draw connections
                    particles.forEach(otherParticle => {
                        const dx = particle.x - otherParticle.x;
                        const dy = particle.y - otherParticle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 100) {
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(139, 69, 19, ${0.1 * (1 - distance / 100)})`;
                            ctx.lineWidth = 0.5;
                            ctx.moveTo(particle.x, particle.y);
                            ctx.lineTo(otherParticle.x, otherParticle.y);
                            ctx.stroke();
                        }
                    });
                });
                
                requestAnimationFrame(animateParticles);
            }
            
            // Initialize
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            animateParticles();
        }
        
        // ===== 3D BOOK EFFECT =====
        const book3d = document.getElementById('book3d');
        const rotateBookBtn = document.getElementById('rotateBook');
        const zoomBookBtn = document.getElementById('zoomBook');
        const bookModal = document.getElementById('bookModal');
        const modalClose = document.getElementById('modalClose');
        
        let isRotating = false;
        let rotationY = 0;
        let rotationX = 0;
        
        if (book3d) {
            // Mouse interaction
            book3d.addEventListener('mousemove', (e) => {
                if (isRotating) return;
                
                const rect = book3d.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                rotationY = ((x - centerX) / centerX) * 20;
                rotationX = ((centerY - y) / centerY) * 10;
                
                book3d.style.transform = `perspective(1000px) rotateY(${rotationY}deg) rotateX(${rotationX}deg) scale(1.05)`;
            });
            
            book3d.addEventListener('mouseleave', () => {
                if (isRotating) return;
                book3d.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
                rotationY = 0;
                rotationX = 0;
            });
            
            // Auto-rotate button
            if (rotateBookBtn) {
                rotateBookBtn.addEventListener('click', () => {
                    isRotating = !isRotating;
                    
                    if (isRotating) {
                        rotateBookBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Rotation';
                        rotateBookBtn.style.background = 'var(--accent-color)';
                        rotateBookBtn.style.color = 'white';
                        autoRotate();
                    } else {
                        rotateBookBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Rotate View';
                        rotateBookBtn.style.background = '';
                        rotateBookBtn.style.color = '';
                        book3d.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
                    }
                });
            }
            
            function autoRotate() {
                if (!isRotating) return;
                
                rotationY += 1;
                book3d.style.transform = `perspective(1000px) rotateY(${rotationY}deg) rotateX(${rotationX}deg) scale(1.05)`;
                
                requestAnimationFrame(autoRotate);
            }
            
            // Zoom modal
            if (zoomBookBtn && bookModal && modalClose) {
                zoomBookBtn.addEventListener('click', () => {
                    bookModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
                
                modalClose.addEventListener('click', () => {
                    bookModal.classList.remove('active');
                    document.body.style.overflow = '';
                });
                
                bookModal.addEventListener('click', (e) => {
                    if (e.target === bookModal) {
                        bookModal.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
            }
        }
        
        // ===== INTERACTIVE BOOKSHELF =====
        const bookSpines = document.querySelectorAll('.book-spine');
        const bookDetailsContainer = document.getElementById('book-details-container');
        
        const bookData = {
            redpath: {
                title: "The Red Path",
                status: "Forthcoming",
                description: "A literary novel exploring grief, ancestry, and homecoming through the story of Sekou, a flight attendant pulled back to his Kenyan homeland by a supernatural compass.",
                genre: "Literary Fiction / Magical Realism",
                wordCount: "95,000 words",
                statusNote: "Currently being submitted to literary agents"
            },
            phoenix: {
                title: "The Phoenix Covenant",
                status: "Completed",
                description: "An epic of transformation where elemental forces awaken and characters must choose between the safety of tradition and the terrifying promise of rebirth.",
                genre: "Fantasy / Epic Fiction",
                wordCount: "120,000 words",
                statusNote: "Available for representation"
            },
            future1: {
                title: "Untitled Project",
                status: "In Development",
                description: "A new literary project exploring themes of diaspora, memory, and the stories we inherit. Currently in early development stages.",
                genre: "Literary Fiction",
                wordCount: "In progress",
                statusNote: "Early drafting phase"
            },
            future2: {
                title: "Untitled Project",
                status: "Planned",
                description: "Future project exploring new narrative territories while maintaining the emotional depth and cultural richness of previous works.",
                genre: "To be determined",
                wordCount: "Planned",
                statusNote: "In conceptualization phase"
            }
        };
        
        function showBookDetails(bookKey) {
            const book = bookData[bookKey];
            if (!book || !bookDetailsContainer) return;
            
            bookDetailsContainer.innerHTML = `
                <div class="book-details-mini">
                    <div class="mini-header">
                        <h3>${book.title}</h3>
                        <span class="mini-status">${book.status}</span>
                    </div>
                    <div class="mini-genre">${book.genre}</div>
                    <p class="mini-description">${book.description}</p>
                    <div class="mini-meta">
                        <div class="meta-item">
                            <strong>Word Count:</strong> ${book.wordCount}
                        </div>
                        <div class="meta-item">
                            <strong>Status:</strong> ${book.statusNote}
                        </div>
                    </div>
                </div>
            `;
            
            // Update active state
            bookSpines.forEach(spine => spine.classList.remove('active'));
            const activeSpine = document.querySelector(`.book-spine[data-book="${bookKey}"]`);
            if (activeSpine) activeSpine.classList.add('active');
        }
        
        // Initialize bookshelf
        if (bookSpines.length > 0 && bookDetailsContainer) {
            showBookDetails('redpath'); // Show The Red Path by default
            
            bookSpines.forEach(spine => {
                spine.addEventListener('click', () => {
                    const bookKey = spine.getAttribute('data-book');
                    showBookDetails(bookKey);
                });
            });
        }
        
        // ===== ANIMATED COUNTERS =====
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        
        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 100;
            const duration = 1500;
            const stepTime = Math.abs(Math.floor(duration / target));
            
            const timer = setInterval(() => {
                current += increment;
                element.textContent = Math.floor(current);
                
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                }
            }, stepTime);
        }
        
        function checkCounters() {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const rect = stat.getBoundingClientRect();
                
                if (rect.top < window.innerHeight - 100 && !stat.hasAttribute('data-animated')) {
                    stat.setAttribute('data-animated', 'true');
                    animateCounter(stat, target);
                }
            });
        }
        
        window.addEventListener('scroll', checkCounters);
        checkCounters(); // Check on load
        
        // ===== CONTACT FORM =====
        const contactForm = document.getElementById('contactForm');
        const formStatus = document.getElementById('formStatus');
        
        if (contactForm && formStatus) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Basic validation
                const requiredFields = contactForm.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.style.borderColor = 'var(--accent-color)';
                    } else {
                        field.style.borderColor = '';
                    }
                });
                
                if (!isValid) {
                    showFormStatus('Please fill in all required fields.', 'error');
                    return;
                }
                
                // Get form data
                const formData = {
                    name: document.getElementById('contactName').value,
                    email: document.getElementById('contactEmail').value,
                    subject: document.getElementById('contactSubject').value,
                    message: document.getElementById('contactMessage').value,
                    timestamp: new Date().toISOString()
                };
                
                // Simulate form submission (replace with actual backend integration)
                showFormStatus('Sending your message...', 'info');
                
                // In a real implementation, you would send this to your backend
                // For now, we'll simulate a successful submission
                setTimeout(() => {
                    // Success simulation
                    console.log('Form submission:', formData);
                    showFormStatus('Thank you for your message! I will get back to you soon.', 'success');
                    contactForm.reset();
                    
                    // In a real implementation, you might want to:
                    // 1. Send data to Formspree, EmailJS, or your own backend
                    // 2. Handle actual form submission
                    // 3. Set up proper error handling
                }, 2000);
            });
        }
        
        function showFormStatus(message, type) {
            if (!formStatus) return;
            
            formStatus.textContent = message;
            formStatus.className = 'form-status';
            formStatus.classList.add(type);
            
            // Auto-hide success messages
            if (type === 'success') {
                setTimeout(() => {
                    formStatus.classList.remove('success');
                    formStatus.style.display = 'none';
                }, 5000);
            }
        }
        
        // ===== REQUEST SAMPLE BUTTON =====
        const requestSampleBtn = document.querySelector('.request-sample');
        if (requestSampleBtn) {
            requestSampleBtn.addEventListener('click', () => {
                // In a real implementation, this would trigger a download or redirect
                // For now, we'll show a message
                showFormStatus('Sample chapters request noted. Please use the contact form for official requests from agents and publishers.', 'info');
                
                // You could also:
                // 1. Open a modal with sample content
                // 2. Redirect to a sample PDF
                // 3. Trigger an email with sample attachments
            });
        }
        
        // ===== SCROLL ANIMATIONS =====
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
        window.addEventListener('scroll', () => {
            handleScrollAnimation();
        });
        handleScrollAnimation(); // Check on load
        
        // ===== ADDITIONAL ENHANCEMENTS =====
        
        // Add active class to current section in navigation
        function updateActiveNavLink() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                const scrollPosition = window.scrollY;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveNavLink);
        updateActiveNavLink(); // Check on load
        
        // Add intersection observer for more precise animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);
        
        // Observe elements for animations
        document.querySelectorAll('.feature, .process-step, .highlight-item').forEach(el => {
            observer.observe(el);
        });
        
        // Initialize tooltips for social icons
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', (e) => {
                const platform = icon.getAttribute('aria-label');
                // You could add a custom tooltip here
            });
        });
    }
});
