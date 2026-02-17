// ===========================
// TEKE SHOES - MAIN SCRIPT
// ===========================

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && menuToggle) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    }
});

// ===========================
// PRODUCT FILTERING
// ===========================

const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter products
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = '';
                    // Trigger animation
                    setTimeout(() => {
                        card.classList.add('fade-in');
                    }, 10);
                } else {
                    card.style.display = 'none';
                    card.classList.remove('fade-in');
                }
            });
        });
    });
}

// ===========================
// NEWSLETTER FORM HANDLING
// ===========================

const newsletterForm = document.getElementById('newsletterForm');
const blogNewsletterForm = document.getElementById('blogNewsletterForm');

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    
    // Validate email
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Simulate API call
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Subscribing...';
    button.disabled = true;

    setTimeout(() => {
        form.reset();
        button.textContent = originalText;
        button.disabled = false;
        showNotification('Thank you for subscribing! Check your email for confirmation.', 'success');
    }, 1000);
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
}

if (blogNewsletterForm) {
    blogNewsletterForm.addEventListener('submit', handleNewsletterSubmit);
}

// ===========================
// CONTACT FORM VALIDATION & HANDLING
// ===========================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name) {
            showNotification('Please enter your name', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        if (!subject) {
            showNotification('Please select a subject', 'error');
            return;
        }

        if (!message) {
            showNotification('Please enter a message', 'error');
            return;
        }

        // Simulate API call
        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = 'Sending...';
        button.disabled = true;

        setTimeout(() => {
            contactForm.reset();
            button.textContent = originalText;
            button.disabled = false;
            showNotification('Thank you for contacting us! We will get back to you soon.', 'success');
        }, 1500);
    });
}

// ===========================
// ADD TO CART FUNCTIONALITY
// ===========================

const addToCartBtns = document.querySelectorAll('.btn-small');

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.textContent.toLowerCase().includes('add to cart')) {
            e.preventDefault();
            const card = btn.closest('.product-card');
            const productName = card.querySelector('h3').textContent;
            const price = card.querySelector('.price').textContent;
            
            // Visual feedback
            const originalText = btn.textContent;
            btn.textContent = '✓ Added!';
            btn.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
            }, 2000);

            // Show notification
            showNotification(`${productName} added to cart!`, 'success');
        }
    });
});

// ===========================
// FAQ ACCORDION
// ===========================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const header = item.querySelector('h4');
    
    if (header) {
        header.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(other => {
                if (other !== item && other.classList.contains('active')) {
                    other.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    }
});

// ===========================
// SMOOTH SCROLL & ACTIVE NAVIGATION
// ===========================

window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Only update active state for current page
        if (href === window.location.pathname.split('/').pop() || 
            (href === 'index.html' && window.location.pathname.includes('index'))) {
            link.classList.add('active');
        } else if (href === window.location.pathname) {
            link.classList.add('active');
        }
    });
});

// ===========================
// WISHLIST FUNCTIONALITY
// ===========================

const wishlistBtns = document.querySelectorAll('.btn-icon');

wishlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = btn.querySelector('i');
        
        if (icon.classList.contains('far')) {
            // Add to wishlist
            icon.classList.remove('far');
            icon.classList.add('fas');
            btn.style.backgroundColor = '#ff6600';
            showNotification('Added to wishlist!', 'success');
        } else {
            // Remove from wishlist
            icon.classList.remove('fas');
            icon.classList.add('far');
            btn.style.backgroundColor = 'rgba(255, 102, 0, 0.9)';
            showNotification('Removed from wishlist', 'info');
        }
    });
});

// ===========================
// NOTIFICATION SYSTEM
// ===========================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles dynamically if not in CSS
    if (!document.querySelector('style[data-notification]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                max-width: 400px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 1000;
                animation: slideIn 0.3s ease;
            }

            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }

            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.2s;
            }

            .notification-close:hover {
                opacity: 1;
            }

            .notification-success {
                background-color: #4CAF50;
                color: white;
            }

            .notification-error {
                background-color: #f44336;
                color: white;
            }

            .notification-info {
                background-color: #2196F3;
                color: white;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }

            .notification.remove {
                animation: slideOut 0.3s ease;
            }

            @media (max-width: 480px) {
                .notification {
                    left: 20px;
                    right: 20px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add to DOM
    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });

    // Auto remove after 4 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 4000);
}

function removeNotification(notification) {
    notification.classList.add('remove');
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// ===========================
// FORM VALIDATION HELPER
// ===========================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===========================
// ANIMATION ON SCROLL
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe product cards and other elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll(
        '.product-card, .blog-card, .team-member, .value-card, .testimonial-card'
    );
    elementsToObserve.forEach(el => observer.observe(el));
});

// ===========================
// LOAD MORE ARTICLES
// ===========================

const loadMoreBtn = document.querySelector('.blog-cta .btn');

if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        showNotification('More articles coming soon!', 'info');
    });
}

// ===========================
// INITIALIZE PAGE
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Set active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        let href = link.getAttribute('href');
        
        if (currentPage === '' || currentPage === '/') {
            href = 'index.html';
        }
        
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Fade in first product cards/blog cards immediately
    const cards = document.querySelectorAll('.product-card:nth-child(1), .product-card:nth-child(2), .product-card:nth-child(3)');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
});

// ===========================
// QUICK VIEW FUNCTIONALITY
// ===========================

const quickViewBtns = document.querySelectorAll('[title="Quick View"]');

quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.product-card');
        const productName = card.querySelector('h3').textContent;
        showNotification(`Viewing ${productName}`, 'info');
        // In a real app, this would open a modal with full product details
    });
});

// ===========================
// CONSOLE GREETING
// ===========================

console.log('%cWelcome to Teke Shoes! 👟', 'color: #ff6600; font-size: 18px; font-weight: bold;');
console.log('%cBuilt with quality and care', 'color: #666; font-size: 12px;');