// 🚀 SPECTACULAR WEBSITE ENHANCER - NEXT LEVEL!
class SpectacularWebsiteEnhancer {
    constructor() {
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.setupAdvancedParticles();
        this.setupMagicCursor();
        this.setupScrollAnimations();
        this.setupInteractiveButtons();
        this.setupTextEffects();
        this.setupParallaxEffects();
        this.setupSoundEffects();
        this.setupNavigationMagic();
        this.setupHomeEnhancements();
    }

    // 🌌 ADVANCED 3D PARTICLE SYSTEM
    setupAdvancedParticles() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
            mix-blend-mode: screen;
        `;
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let animationId;
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // 🎨 Particle class with 3D effects
        class MagicParticle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.z = Math.random() * 1000;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
                this.vz = Math.random() * 2;
                this.radius = Math.random() * 3 + 1;
                this.color = this.getRandomColor();
                this.life = Math.random() * 100 + 100;
                this.maxLife = this.life;
                this.pulse = Math.random() * Math.PI * 2;
            }
            
            getRandomColor() {
                const colors = ['#1565c0', '#0d47a1', '#1976d2', '#2196f3', '#64b5f6', '#90caf9'];
                return colors[Math.floor(Math.random() * colors.length)];
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.z += this.vz;
                this.pulse += 0.02;
                this.life--;
                
                // 3D perspective effect
                const perspective = 800;
                const scale = perspective / (perspective + this.z);
                this.displayX = (this.x - canvas.width / 2) * scale + canvas.width / 2;
                this.displayY = (this.y - canvas.height / 2) * scale + canvas.height / 2;
                this.displayRadius = this.radius * scale;
                
                // Boundary checks
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
                if (this.z < 0 || this.z > 1000) this.vz *= -1;
                
                // Pulse effect
                this.currentRadius = this.displayRadius * (1 + Math.sin(this.pulse) * 0.3);
                
                // Life cycle
                if (this.life <= 0) {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.z = Math.random() * 1000;
                    this.life = this.maxLife;
                    this.color = this.getRandomColor();
                }
            }
            
            draw() {
                const alpha = this.life / this.maxLife;
                
                // Glow effect
                const gradient = ctx.createRadialGradient(
                    this.displayX, this.displayY, 0,
                    this.displayX, this.displayY, this.currentRadius * 3
                );
                gradient.addColorStop(0, this.color + Math.floor(alpha * 255).toString(16).padStart(2, '0'));
                gradient.addColorStop(0.5, this.color + '40');
                gradient.addColorStop(1, this.color + '00');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.displayX, this.displayY, this.currentRadius * 3, 0, Math.PI * 2);
                ctx.fill();
                
                // Core particle
                ctx.fillStyle = this.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
                ctx.beginPath();
                ctx.arc(this.displayX, this.displayY, this.currentRadius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Create particles - reduced for professional look
        for (let i = 0; i < 30; i++) {
            this.particles.push(new MagicParticle());
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw particles
            this.particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            // Draw connections with mouse interaction
            this.drawConnections(ctx);
            
            animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }

    // 🔗 Particle connections
    drawConnections(ctx) {
        this.particles.forEach((particle, i) => {
            // Connect particles to each other
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.displayX - otherParticle.displayX;
                const dy = particle.displayY - otherParticle.displayY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const alpha = (120 - distance) / 120;
                    const gradient = ctx.createLinearGradient(
                        particle.displayX, particle.displayY,
                        otherParticle.displayX, otherParticle.displayY
                    );
                    gradient.addColorStop(0, particle.color + Math.floor(alpha * 50).toString(16).padStart(2, '0'));
                    gradient.addColorStop(1, otherParticle.color + Math.floor(alpha * 50).toString(16).padStart(2, '0'));
                    
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = alpha * 2;
                    ctx.beginPath();
                    ctx.moveTo(particle.displayX, particle.displayY);
                    ctx.lineTo(otherParticle.displayX, otherParticle.displayY);
                    ctx.stroke();
                }
            });
            
            // Connect particles to mouse
            const dx = particle.displayX - this.mouse.x;
            const dy = particle.displayY - this.mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const alpha = (150 - distance) / 150;
                ctx.strokeStyle = `#ffffff${Math.floor(alpha * 100).toString(16).padStart(2, '0')}`;
                ctx.lineWidth = alpha * 3;
                ctx.beginPath();
                ctx.moveTo(particle.displayX, particle.displayY);
                ctx.lineTo(this.mouse.x, this.mouse.y);
                ctx.stroke();
            }
        });
    }

    // ✨ CURSOR EFFECTS - DISABLED FOR PROFESSIONAL CHARITY WEBSITE
    setupMagicCursor() {
        // Magic cursor effects disabled for professional charity appearance
        console.log('Magic cursor effects disabled for charity organization website');
    }

    // 🎭 SPECTACULAR SCROLL ANIMATIONS
    setupScrollAnimations() {
        // Disable all animations for stats section
        document.querySelectorAll('.stats-section, .stats-grid, .stat-card').forEach(element => {
            element.style.transition = 'none';
            element.style.animation = 'none';
            element.style.transform = 'none';
            element.style.position = 'static';
        });
    }

    // ✨ Sparkle effects - DISABLED FOR PROFESSIONAL CHARITY WEBSITE
    triggerSparkles(element) {
        // Sparkle effects disabled for professional charity appearance
        console.log('Sparkle effects disabled for charity organization website');
    }

    // Theme is set to light mode only
    setupThemeToggle() {
        // Set theme to light mode permanently
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.setAttribute('data-theme', 'light');
    }

    // 🔥 INTERACTIVE BUTTONS
    setupInteractiveButtons() {
        document.querySelectorAll('.btn-box a, .dropbtn').forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e.target, e);
                this.addButtonGlow(e.target);
            });
            
            button.addEventListener('mouseleave', (e) => {
                this.removeButtonGlow(e.target);
            });
            
            button.addEventListener('click', (e) => {
                this.createClickExplosion(e.target, e);
            });
        });
    }

    createRippleEffect(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
            transform: translate(${x}px, ${y}px) scale(0);
            pointer-events: none;
            z-index: 1;
        `;
        
        element.appendChild(ripple);
        
        ripple.animate([
            { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 1 },
            { transform: `translate(${x}px, ${y}px) scale(1)`, opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => ripple.remove();
    }

    addButtonGlow(element) {
        element.style.filter = 'drop-shadow(0 0 20px rgba(191, 0, 255, 0.8))';
        element.style.transform = 'translateY(-5px) scale(1.05)';
    }

    removeButtonGlow(element) {
        element.style.filter = '';
        element.style.transform = '';
    }

    createClickExplosion(element, event) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: #fff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${centerX}px;
                top: ${centerY}px;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (i / 15) * Math.PI * 2;
            const velocity = 100 + Math.random() * 100;
            const endX = Math.cos(angle) * velocity;
            const endY = Math.sin(angle) * velocity;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${endX}px, ${endY}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800 + Math.random() * 400,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => particle.remove();
        }
    }

    // 📝 TEXT EFFECTS
    setupTextEffects() {
        // Typing effect for main title
        const titles = document.querySelectorAll('.home-content h1, .home-content1 h1');
        titles.forEach(title => {
            const text = title.textContent;
            title.textContent = '';
            title.style.borderRight = '3px solid #ff006e';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                title.textContent = text.slice(0, i + 1);
                i++;
                
                if (i >= text.length) {
                    clearInterval(typeInterval);
                    // Remove cursor after typing
                    setTimeout(() => {
                        title.style.borderRight = 'none';
                    }, 1000);
                }
            }, 100);
        });

        // Glitch effect for section titles
        document.querySelectorAll('.section-title').forEach(title => {
            title.addEventListener('mouseenter', () => {
                this.addGlitchEffect(title);
            });
        });
    }

    addGlitchEffect(element) {
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        let glitchInterval;
        
        const glitch = () => {
            let glitchedText = '';
            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() < 0.1) {
                    glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    glitchedText += originalText[i];
                }
            }
            element.textContent = glitchedText;
        };
        
        glitchInterval = setInterval(glitch, 50);
        
        setTimeout(() => {
            clearInterval(glitchInterval);
            element.textContent = originalText;
        }, 500);
    }

    // 🌊 PARALLAX EFFECTS
    setupParallaxEffects() {
        // Disable parallax for stats section
        document.querySelectorAll('.stats-section, .stats-grid, .stat-card').forEach(element => {
            element.style.transform = 'none';
            element.style.transition = 'none';
            element.style.animation = 'none';
            element.style.position = 'static';
        });
    }

    // 🔊 SOUND EFFECTS - DISABLED FOR PROFESSIONAL CHARITY WEBSITE
    setupSoundEffects() {
        // Sound effects disabled to maintain professional atmosphere
        console.log('Sound effects disabled for charity organization website');
    }

    // 🧭 NAVIGATION MAGIC
    setupNavigationMagic() {
        const navbar = document.querySelector('.navbar');
        const toggleBtn = document.querySelector('.toggle-btn');
        const dropdowns = document.querySelectorAll('.dropdown');
        
        // Mobile menu toggle
        if (toggleBtn && navbar) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                navbar.classList.toggle('active');
                const isActive = navbar.classList.contains('active');
                
                // Update ARIA attributes
                toggleBtn.setAttribute('aria-expanded', isActive);
                
                // Change hamburger icon to X
                const icon = toggleBtn.querySelector('i');
                if (icon) {
                    icon.className = isActive ? 'bx bx-x' : 'bx bx-menu';
                    icon.style.transform = isActive ? 'rotate(180deg)' : 'rotate(0deg)';
                }
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = isActive ? 'hidden' : '';
                
                // Animate menu items
                const links = navbar.querySelectorAll('a');
                links.forEach((link, index) => {
                    if (isActive) {
                        setTimeout(() => {
                            link.style.transform = 'translateX(0)';
                            link.style.opacity = '1';
                        }, index * 100);
                    } else {
                        link.style.transform = 'translateX(-50px)';
                        link.style.opacity = '0';
                    }
                });
            });
        }
        
        // Mobile dropdown functionality
        dropdowns.forEach(dropdown => {
            const dropbtn = dropdown.querySelector('.dropbtn');
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            
            if (dropbtn && dropdownContent) {
                dropbtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            const otherContent = otherDropdown.querySelector('.dropdown-content');
                            if (otherContent) {
                                otherContent.classList.remove('show');
                            }
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdownContent.classList.toggle('show');
                });
            }
        });
        
        // Close mobile menu when clicking on nav links (including dropdown links)
        const navLinks = navbar.querySelectorAll('a:not(.dropbtn)');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Allow normal navigation for dropdown links
                if (link.closest('.dropdown-content')) {
                    // Don't prevent default for dropdown links - let them navigate
                }
                
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    toggleBtn.setAttribute('aria-expanded', 'false');
                    
                    // Reset icon
                    const icon = toggleBtn.querySelector('i');
                    if (icon) {
                        icon.className = 'bx bx-menu';
                        icon.style.transform = 'rotate(0deg)';
                    }
                    
                    // Restore body scroll
                    document.body.style.overflow = '';
                    
                    // Close any open dropdowns
                    dropdowns.forEach(dropdown => {
                        const dropdownContent = dropdown.querySelector('.dropdown-content');
                        if (dropdownContent) {
                            dropdownContent.classList.remove('show');
                        }
                    });
                }
            });
        });
        
        // Close mobile menu and dropdown when clicking outside
        document.addEventListener('click', (e) => {
            // Close mobile menu
            if (navbar && navbar.classList.contains('active')) {
                if (!navbar.contains(e.target) && !toggleBtn.contains(e.target)) {
                    navbar.classList.remove('active');
                    toggleBtn.setAttribute('aria-expanded', 'false');
                    
                    // Reset icon
                    const icon = toggleBtn.querySelector('i');
                    if (icon) {
                        icon.className = 'bx bx-menu';
                        icon.style.transform = 'rotate(0deg)';
                    }
                    
                    // Restore body scroll
                    document.body.style.overflow = '';
                }
            }
            
            // Close dropdowns
            dropdowns.forEach(dropdown => {
                const dropdownContent = dropdown.querySelector('.dropdown-content');
                if (dropdownContent && !dropdown.contains(e.target)) {
                    dropdownContent.classList.remove('show');
                }
            });
        });
        
        // Keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close mobile menu
                if (navbar && navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    toggleBtn.setAttribute('aria-expanded', 'false');
                    
                    // Reset icon
                    const icon = toggleBtn.querySelector('i');
                    if (icon) {
                        icon.className = 'bx bx-menu';
                        icon.style.transform = 'rotate(0deg)';
                    }
                    
                    // Restore body scroll
                    document.body.style.overflow = '';
                    
                    // Focus back to toggle button
                    toggleBtn.focus();
                }
                
                // Close dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.querySelector('.dropdown-content').classList.remove('show');
                });
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                // Close mobile menu on desktop
                if (navbar && navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    toggleBtn.setAttribute('aria-expanded', 'false');
                    
                    // Reset icon
                    const icon = toggleBtn.querySelector('i');
                    if (icon) {
                        icon.className = 'bx bx-menu';
                        icon.style.transform = 'rotate(0deg)';
                    }
                    
                    // Restore body scroll
                    document.body.style.overflow = '';
                }
                
                // Close dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.querySelector('.dropdown-content').classList.remove('show');
                });
            }
        });
        
        // Smooth scrolling with easing
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const targetPosition = target.offsetTop - 100;
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 1000;
                    let start = null;
                    
                    const animation = (currentTime) => {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const run = this.easeInOutQuart(timeElapsed, startPosition, distance, duration);
                        window.scrollTo(0, run);
                        if (timeElapsed < duration) requestAnimationFrame(animation);
                    };
                    
                    requestAnimationFrame(animation);
                }
            });
        });
    }

    // Easing function
    easeInOutQuart(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    }

    // 🏠 HOME SECTION ENHANCEMENTS
    setupHomeEnhancements() {
        // Welcome message auto-hide
        const welcomeMessage = document.querySelector('.welcome-message');
        if (welcomeMessage) {
            setTimeout(() => {
                welcomeMessage.style.opacity = '0';
                welcomeMessage.style.transform = 'translateX(50px)';
                setTimeout(() => {
                    welcomeMessage.style.display = 'none';
                }, 500);
            }, 5000);
        }

        // Parallax effect for decorative elements
        const home = document.querySelector('.home');
        if (home) {
            window.addEventListener('mousemove', (e) => {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                const decorElement = home.querySelector('.home::after');
                if (decorElement) {
                    decorElement.style.transform = `translate(${50 + mouseX * 10}%, ${-50 + mouseY * 10}%)`;
                }
            });
        }

        // Enhanced button hover effects
        document.querySelectorAll('.btn-box a').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                button.style.setProperty('--mouse-x', `${x}px`);
                button.style.setProperty('--mouse-y', `${y}px`);
            });
        });

        // Social media icons pulse effect
        document.querySelectorAll('.home-sci a').forEach(icon => {
            icon.addEventListener('mouseover', () => {
                icon.style.transform = 'translateY(-5px) scale(1.1)';
                setTimeout(() => {
                    icon.style.transform = 'translateY(-2px) scale(1.1)';
                }, 200);
            });
        });
    }
}

// 🚀 INITIALIZE THE SPECTACULAR EXPERIENCE
document.addEventListener('DOMContentLoaded', () => {
    const enhancer = new SpectacularWebsiteEnhancer();
    enhancer.init();
    
    // Add loading screen removal
    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) {
        setTimeout(() => {
            loadingSpinner.style.opacity = '0';
            setTimeout(() => {
                loadingSpinner.style.display = 'none';
            }, 500);
        }, 2000);
    }
    
    // Add scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// 🎆 SUBTLE VISUAL EFFECTS FOR CHARITY WEBSITE
const addVisualEffects = () => {
    // Subtle floating circles - professional and calming
    const colors = ['#1565c0', '#2196f3', '#64b5f6'];
    
    setInterval(() => {
        const shape = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        shape.style.cssText = `
            position: fixed;
            width: ${Math.random() * 40 + 10}px;
            height: ${Math.random() * 40 + 10}px;
            background: ${color}20;
            border-radius: 50%;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 100}px;
            pointer-events: none;
            z-index: -1;
            animation: floatUp ${Math.random() * 15 + 10}s linear forwards;
        `;
        
        document.body.appendChild(shape);
        
        setTimeout(() => {
            shape.remove();
        }, 25000);
    }, 8000);
};

// Add floating shapes CSS
const floatingShapesCSS = `
    @keyframes floatUp {
        to {
            transform: translateY(-${window.innerHeight + 200}px) rotate(360deg);
            opacity: 0;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = floatingShapesCSS;
document.head.appendChild(styleSheet);

// Start visual effects
addVisualEffects();

// Theme is set to light mode only
document.documentElement.setAttribute('data-theme', 'light');
document.body.setAttribute('data-theme', 'light');

// Disable all animations for stats section immediately
document.addEventListener('DOMContentLoaded', () => {
    // Immediately disable all animations and transitions
    const disableAnimations = () => {
        const elements = document.querySelectorAll('.stats-section, .stats-grid, .stat-card, .stat-icon, .stat-number, .stat-label');
        elements.forEach(element => {
            if (element) {
                element.style.cssText = `
                    transform: none !important;
                    transition: none !important;
                    animation: none !important;
                    position: relative !important;
                    will-change: auto !important;
                    perspective: none !important;
                    backface-visibility: hidden !important;
                `;
            }
        });
    };

    // Run immediately
    disableAnimations();

    // Run on any dynamic content changes
    const observer = new MutationObserver(disableAnimations);
    observer.observe(document.body, { 
        childList: true, 
        subtree: true 
    });

    // Counter animation only
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.getAttribute('data-target'));
                
                let current = 0;
                const increment = finalNumber / 50;
                const timer = setInterval(() => {
                    current += increment;
                    target.textContent = Math.floor(current);
                    
                    if (current >= finalNumber) {
                        target.textContent = finalNumber;
                        clearInterval(timer);
                    }
                }, 40);
                
                counterObserver.unobserve(target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px'
    });

    document.querySelectorAll('.stat-number').forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Ensure no animations on scroll
window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        document.querySelectorAll('.stats-section, .stats-grid, .stat-card').forEach(element => {
            if (element) {
                element.style.cssText = `
                    transform: none !important;
                    transition: none !important;
                    animation: none !important;
                    position: relative !important;
                    will-change: auto !important;
                `;
            }
        });
    });
}, { passive: true });

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'auto' // Changed from 'smooth' to prevent any potential issues
            });
        }
    });
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.toggle-btn');
    const navbar = document.querySelector('.navbar');
    
    if (toggleBtn && navbar) {
        toggleBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
            toggleBtn.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && !toggleBtn.contains(e.target)) {
                navbar.classList.remove('active');
                toggleBtn.classList.remove('active');
            }
        });

        // Close menu when clicking on a link
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                toggleBtn.classList.remove('active');
            });
        });
    }
}); 