// 🎨 STATIC ANNOUNCEMENTS PAGE - NO ANIMATIONS
document.addEventListener('DOMContentLoaded', () => {
    // Remove loading class immediately
    document.body.classList.remove('loading');
    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }

    // Disable all animations on cards
    const announcements = document.querySelectorAll('.announcement-card');
    announcements.forEach(card => {
        card.style.animation = 'none';
        card.style.transform = 'none';
        card.style.transition = 'none';
    });

    // Simple scroll to sections without animations
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView();
            }
        });
    });

    // Static requirement items without hover effects
    const requirementItems = document.querySelectorAll('.requirements-list li, .conditions-list li');
    requirementItems.forEach(item => {
        item.style.transform = 'none';
        item.style.transition = 'none';
    });

    // Static deadline box
    const deadlineBox = document.querySelector('.deadline-box');
    if (deadlineBox) {
        const timeIcon = deadlineBox.querySelector('i');
        if (timeIcon) {
            timeIcon.style.animation = 'none';
            timeIcon.style.transform = 'none';
        }
    }

    // Simple copy to clipboard without animations
    const contactItems = document.querySelectorAll('.contact-item a');
    contactItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (item.href.includes('mailto:') || item.href.includes('tel:')) {
                e.preventDefault();
                navigator.clipboard.writeText(item.textContent);
                const originalText = item.textContent;
                item.textContent = 'Copied';
                setTimeout(() => {
                    item.textContent = originalText;
                }, 1000);
            }
        });
    });

    // Simple newsletter form without animations
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            const button = newsletterForm.querySelector('button');
            
            if (!input.value || !input.value.includes('@')) {
                input.style.borderColor = 'var(--error-color)';
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 1000);
                return;
            }

            button.textContent = '✓';
            input.value = '';
            
            setTimeout(() => {
                button.textContent = 'Subscribe';
            }, 1000);
        });
    }

    // Disable all IntersectionObserver animations
    if (window.IntersectionObserver) {
        const observer = new IntersectionObserver(() => {}, { threshold: 0 });
        document.querySelectorAll('.announcement-card, .requirements-section, .conditions-section, .deadline-section, .contact-section').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            observer.observe(el);
        });
    }

    // Force disable all animations
    const style = document.createElement('style');
    style.textContent = `
        .announcement-card,
        .announcement-card *,
        .announcements-grid,
        .announcements-grid * {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);
});

// Prevent any scroll animations
window.addEventListener('scroll', () => {
    document.querySelectorAll('.announcement-card').forEach(card => {
        card.style.transform = 'none';
        card.style.animation = 'none';
    });
}); 