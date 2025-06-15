// Enhanced Mobile Menu and Dropdown Fix - Bug-Free Version
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Enhanced Mobile Menu Fix Loading...');
    
    // Get all the elements we need
    const toggleBtn = document.querySelector('.toggle-btn');
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.header');
    
    console.log('📱 Elements found:', {
        toggleBtn: !!toggleBtn,
        navbar: !!navbar,
        header: !!header
    });
    
    // Mobile Menu Toggle Function
    function toggleMobileMenu() {
        if (!navbar || !toggleBtn) {
            console.error('❌ Required elements not found for mobile menu');
            return;
        }
        
        const isActive = navbar.classList.contains('active');
        
        if (isActive) {
            // Close menu
            navbar.classList.remove('active');
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
            
            // Change icon back to hamburger
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.className = 'bx bx-menu';
            }
            
            console.log('📱 Mobile menu closed');
        } else {
            // Open menu
            navbar.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.body.classList.add('menu-open');
            
            // Change icon to X
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.className = 'bx bx-x';
            }
            
            console.log('📱 Mobile menu opened');
        }
    }
    
    // Setup mobile menu toggle
    if (toggleBtn) {
        // Remove any existing event listeners
        toggleBtn.replaceWith(toggleBtn.cloneNode(true));
        const newToggleBtn = document.querySelector('.toggle-btn');
        
        newToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔘 Toggle button clicked');
            toggleMobileMenu();
        });
        
        console.log('✅ Mobile menu toggle setup complete');
    }
    
    // Enhanced Dropdown Functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    console.log('🔽 Found dropdowns:', dropdowns.length);
    
    dropdowns.forEach(function(dropdown, index) {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        if (!dropbtn || !dropdownContent) {
            console.warn('⚠️ Dropdown', index, 'missing required elements');
            return;
        }
        
        console.log('🔧 Setting up dropdown', index);
        
        // Remove existing event listeners by cloning
        const newDropbtn = dropbtn.cloneNode(true);
        dropbtn.parentNode.replaceChild(newDropbtn, dropbtn);
        
        // Add click event to dropdown button
        newDropbtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🔽 Dropdown button clicked:', index);
            
            // Close all other dropdowns first
            dropdowns.forEach(function(otherDropdown) {
                if (otherDropdown !== dropdown) {
                    const otherContent = otherDropdown.querySelector('.dropdown-content');
                    if (otherContent) {
                        otherContent.classList.remove('show');
                        otherContent.style.display = 'none';
                    }
                }
            });
            
            // Toggle current dropdown
            const isOpen = dropdownContent.classList.contains('show');
            
            if (isOpen) {
                dropdownContent.classList.remove('show');
                dropdownContent.style.display = 'none';
                console.log('🔼 Dropdown closed:', index);
            } else {
                dropdownContent.classList.add('show');
                dropdownContent.style.display = 'block';
                console.log('🔽 Dropdown opened:', index);
            }
        });
        
        // Handle dropdown links
        const dropdownLinks = dropdownContent.querySelectorAll('a');
        dropdownLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                console.log('🔗 Dropdown link clicked:', link.href);
                
                // Close dropdown
                dropdownContent.classList.remove('show');
                dropdownContent.style.display = 'none';
                
                // Close mobile menu if open
                if (navbar && navbar.classList.contains('active')) {
                    toggleMobileMenu();
                }
                
                // Allow navigation to proceed
                // Don't prevent default - let the link work normally
            });
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        // Check if click is outside any dropdown
        const clickedDropdown = e.target.closest('.dropdown');
        
        if (!clickedDropdown) {
            let closedAny = false;
            dropdowns.forEach(function(dropdown) {
                const content = dropdown.querySelector('.dropdown-content');
                if (content && content.classList.contains('show')) {
                    content.classList.remove('show');
                    content.style.display = 'none';
                    closedAny = true;
                }
            });
            
            if (closedAny) {
                console.log('🔼 Closed dropdowns by clicking outside');
            }
        }
    });
    
    // Close menu when clicking nav links (but not dropdown buttons)
    if (navbar) {
        const navLinks = navbar.querySelectorAll('a:not(.dropbtn)');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                console.log('🔗 Nav link clicked, closing mobile menu');
                
                if (navbar.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
        });
    }
    
    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            if (navbar && navbar.classList.contains('active')) {
                toggleMobileMenu();
            }
            
            // Close all dropdowns
            let closedAny = false;
            dropdowns.forEach(function(dropdown) {
                const content = dropdown.querySelector('.dropdown-content');
                if (content && content.classList.contains('show')) {
                    content.classList.remove('show');
                    content.style.display = 'none';
                    closedAny = true;
                }
            });
            
            if (closedAny) {
                console.log('🔼 Closed dropdowns with ESC key');
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Desktop view - close mobile menu if open
            if (navbar && navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                document.body.style.overflow = '';
                document.body.classList.remove('menu-open');
                
                const icon = document.querySelector('.toggle-btn i');
                if (icon) {
                    icon.className = 'bx bx-menu';
                }
                
                console.log('📱 Mobile menu closed due to resize');
            }
            
            // Reset dropdown styles for desktop
            dropdowns.forEach(function(dropdown) {
                const content = dropdown.querySelector('.dropdown-content');
                if (content) {
                    content.classList.remove('show');
                    content.style.display = '';
                }
            });
        }
    });
    
    console.log('✅ Enhanced Mobile Menu Fix loaded successfully!');
}); 