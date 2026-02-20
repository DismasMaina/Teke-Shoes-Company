// ===========================
// TEKE SHOES - MAIN SCRIPT
// ===========================

// ===========================
// MOBILE MENU TOGGLE
// ===========================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// Create dark overlay element and add to page
const navOverlay = document.createElement('div');
navOverlay.classList.add('nav-overlay');
document.body.appendChild(navOverlay);

function openMenu() {
    navMenu.classList.add('active');
    menuToggle.classList.add('active');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scrolling
}

function closeMenu() {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (menuToggle && navMenu) {
    // Toggle on hamburger click
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close when a nav link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => closeMenu());
    });

    // Close when overlay (dark background) is tapped
    navOverlay.addEventListener('click', () => closeMenu());
}

// ===========================
// PRODUCT FILTERING
// ===========================

const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = '';
                    setTimeout(() => card.classList.add('fade-in'), 10);
                } else {
                    card.style.display = 'none';
                    card.classList.remove('fade-in');
                }
            });
        });
    });
}

// ===========================
// NEWSLETTER FORM
// ===========================

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Subscribing...';
    button.disabled = true;

    setTimeout(() => {
        form.reset();
        button.textContent = originalText;
        button.disabled = false;
        showNotification('Thank you for subscribing!', 'success');
    }, 1000);
}

const newsletterForm = document.getElementById('newsletterForm');
const blogNewsletterForm = document.getElementById('blogNewsletterForm');
if (newsletterForm) newsletterForm.addEventListener('submit', handleNewsletterSubmit);
if (blogNewsletterForm) blogNewsletterForm.addEventListener('submit', handleNewsletterSubmit);

// ===========================
// CONTACT FORM
// ===========================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name    = document.getElementById('name').value.trim();
        const email   = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        if (!name)              { showNotification('Please enter your name', 'error'); return; }
        if (!isValidEmail(email)) { showNotification('Please enter a valid email', 'error'); return; }
        if (!subject)           { showNotification('Please select a subject', 'error'); return; }
        if (!message)           { showNotification('Please enter a message', 'error'); return; }

        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = 'Sending...';
        button.disabled = true;

        setTimeout(() => {
            contactForm.reset();
            button.textContent = originalText;
            button.disabled = false;
            showNotification('Thank you! We will get back to you soon.', 'success');
        }, 1500);
    });
}

// ===========================
// ADD TO CART
// ===========================

document.querySelectorAll('.btn-small').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.textContent.toLowerCase().includes('add to cart')) {
            e.preventDefault();
            const card = btn.closest('.product-card');
            const productName = card.querySelector('h3').textContent;

            const originalText = btn.textContent;
            btn.textContent = '✓ Added!';
            btn.style.backgroundColor = '#4CAF50';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
            }, 2000);

            showNotification(`${productName} added to cart!`, 'success');
        }
    });
});

// ===========================
// FAQ ACCORDION
// ===========================

document.querySelectorAll('.faq-item').forEach(item => {
    const header = item.querySelector('h4');
    if (header) {
        header.addEventListener('click', () => {
            document.querySelectorAll('.faq-item').forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    }
});

// ===========================
// WISHLIST
// ===========================

document.querySelectorAll('.btn-icon').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = btn.querySelector('i');
        if (!icon) return;

        if (icon.classList.contains('far')) {
            icon.classList.replace('far', 'fas');
            btn.style.backgroundColor = '#ff6600';
            showNotification('Added to wishlist!', 'success');
        } else {
            icon.classList.replace('fas', 'far');
            btn.style.backgroundColor = 'rgba(255, 102, 0, 0.9)';
            showNotification('Removed from wishlist', 'info');
        }
    });
});

// ===========================
// QUICK VIEW
// ===========================

document.querySelectorAll('[title="Quick View"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.product-card');
        const productName = card.querySelector('h3').textContent;
        showNotification(`Viewing ${productName}`, 'info');
    });
});

// ===========================
// NOTIFICATION SYSTEM
// ===========================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    if (!document.querySelector('style[data-notification]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            .notification {
                position: fixed; top: 20px; right: 20px;
                max-width: 400px; padding: 1rem 1.5rem;
                border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 99999; animation: slideIn 0.3s ease;
            }
            .notification-content { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
            .notification-close { background: none; border: none; font-size: 1.5rem; cursor: pointer; opacity: 0.7; color: white; }
            .notification-close:hover { opacity: 1; }
            .notification-success { background-color: #4CAF50; color: white; }
            .notification-error   { background-color: #f44336; color: white; }
            .notification-info    { background-color: #2196F3; color: white; }
            @keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(400px); opacity: 0; } }
            .notification.remove { animation: slideOut 0.3s ease; }
            @media (max-width: 480px) { .notification { left: 20px; right: 20px; max-width: none; } }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);
    notification.querySelector('.notification-close').addEventListener('click', () => removeNotification(notification));
    setTimeout(() => removeNotification(notification), 4000);
}

function removeNotification(notification) {
    notification.classList.add('remove');
    setTimeout(() => notification.remove(), 300);
}

// ===========================
// FORM VALIDATION
// ===========================

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===========================
// SCROLL ANIMATIONS
// ===========================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.product-card, .blog-card, .team-member, .value-card, .testimonial-card')
        .forEach(el => observer.observe(el));
});

// ===========================
// SET ACTIVE NAV LINK
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Fade in first product cards
    document.querySelectorAll('.product-card:nth-child(1), .product-card:nth-child(2), .product-card:nth-child(3)')
        .forEach((card, i) => setTimeout(() => card.classList.add('fade-in'), i * 100));
});

// ===========================
// LOAD MORE
// ===========================

const loadMoreBtn = document.querySelector('.blog-cta .btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => showNotification('More articles coming soon!', 'info'));
}

// ===========================
// CONSOLE GREETING
// ===========================

console.log('%cWelcome to Teke Shoes! 👟', 'color: #ff6600; font-size: 18px; font-weight: bold;');
console.log('%cBuilt with quality and care', 'color: #666; font-size: 12px;');