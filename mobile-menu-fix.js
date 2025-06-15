// Simple Mobile Menu and Dropdown Fix
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile menu fix loaded');
    
    // Simple mobile menu toggle
    const toggleBtn = document.querySelector('.toggle-btn');
    const navbar = document.querySelector('.navbar');
    
    if (toggleBtn && navbar) {
        console.log('Mobile menu elements found');
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            navbar.classList.toggle('active');
            const isActive = navbar.classList.contains('active');
            console.log('Mobile menu toggled:', isActive);
            
            // Change icon
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.className = isActive ? 'bx bx-x' : 'bx bx-menu';
            }
            
            // Prevent body scroll
            document.body.style.overflow = isActive ? 'hidden' : '';
        });
    } else {
        console.log('Mobile menu elements not found:', { toggleBtn, navbar });
    }
    
    // Simple dropdown toggle
    const dropbtns = document.querySelectorAll('.dropbtn');
    console.log('Found dropdown buttons:', dropbtns.length);
    
    dropbtns.forEach(function(dropbtn, index) {
        console.log('Setting up dropdown', index);
        dropbtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Dropdown button clicked');
            
            const dropdown = dropbtn.closest('.dropdown');
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            
            if (!dropdownContent) {
                console.log('Dropdown content not found');
                return;
            }
            
            // Close other dropdowns
            document.querySelectorAll('.dropdown-content').forEach(function(content) {
                if (content !== dropdownContent) {
                    content.classList.remove('show');
                }
            });
            
            // Toggle current dropdown
            dropdownContent.classList.toggle('show');
            const isOpen = dropdownContent.classList.contains('show');
            console.log('Dropdown is now:', isOpen ? 'open' : 'closed');
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            const openDropdowns = document.querySelectorAll('.dropdown-content.show');
            if (openDropdowns.length > 0) {
                console.log('Closing dropdowns by clicking outside');
                openDropdowns.forEach(function(content) {
                    content.classList.remove('show');
                });
            }
        }
    });
    
    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.navbar a:not(.dropbtn)');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            console.log('Nav link clicked, closing menu');
            
            if (navbar && navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                const icon = toggleBtn.querySelector('i');
                if (icon) {
                    icon.className = 'bx bx-menu';
                }
                document.body.style.overflow = '';
            }
            
            // Close dropdowns
            document.querySelectorAll('.dropdown-content').forEach(function(content) {
                content.classList.remove('show');
            });
        });
    });
    
    // ESC key support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            if (navbar && navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                const icon = toggleBtn.querySelector('i');
                if (icon) {
                    icon.className = 'bx bx-menu';
                }
                document.body.style.overflow = '';
            }
            
            // Close dropdowns
            document.querySelectorAll('.dropdown-content').forEach(function(content) {
                content.classList.remove('show');
            });
        }
    });
}); 