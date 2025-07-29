// Products Page JavaScript

// Initialize EmailJS
(function() {
    emailjs.init('sjJ8kK6U9wFjY0zX9');
})();

// GoHighLevel Webhook Configuration
const GHL_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/k90zUH3RgEQLfj7Yc55b/webhook-trigger/54670718-ea44-43a1-a81a-680ab3d5f67f";
const DEBUG_MODE = false;

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const filterButtons = document.querySelectorAll('.filter-btn');
const productsGrid = document.getElementById('productsGrid');
const productCards = document.querySelectorAll('.product-card');
const productContactForm = document.getElementById('productContactForm');

// Navbar functionality (same as main.js)
// Mobile Navigation Toggle
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Navbar scroll effect
let lastScroll = 0;
function handleScroll() {
    const currentScroll = window.scrollY;
    
    // Show/hide navbar based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    // Remove transparent class on products page
    if (currentScroll > 50) {
        navbar.classList.remove('transparent');
    } else {
        navbar.classList.add('transparent');
    }
    
    lastScroll = currentScroll;
}

// Throttle scroll event
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(handleScroll);
});

// Filter functionality
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Get filter value
        const filter = button.dataset.filter;
        
        // Filter products
        productCards.forEach(card => {
            if (filter === 'all' || card.dataset.brand === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Add transition to product cards
productCards.forEach(card => {
    card.style.transition = 'all 0.3s ease';
});

// Send data to GoHighLevel webhook
async function sendToWebhook(data) {
    try {
        const webhookData = {
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                city: data.city || '',
                message: data.message,
                product: data.product || ''
            }
        };

        if (DEBUG_MODE) {
            console.log('Sending to GHL webhook:', webhookData);
        }

        const response = await fetch(GHL_WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(webhookData)
        });

        if (!response.ok) {
            if (DEBUG_MODE) {
                console.error('GHL webhook response not OK:', response.status, response.statusText);
            }
            return false;
        }
        
        if (DEBUG_MODE) {
            console.log('GHL webhook sent successfully');
        }
        
        return true;
    } catch (error) {
        if (DEBUG_MODE) {
            console.error('GHL webhook error:', error);
        }
        return false;
    }
}

// Send via EmailJS
async function sendViaEmailJS(data) {
    try {
        const templateParams = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            city: data.city || 'Niet opgegeven',
            product: data.product || 'Niet gespecificeerd',
            message: data.message || 'Geen bericht',
            form_type: data.form_type,
            domain: window.location.hostname
        };

        if (DEBUG_MODE) {
            console.log('Sending via EmailJS:', templateParams);
        }

        const response = await emailjs.send('service_1rruujp', 'template_rkcpzhg', templateParams);

        if (response.status === 200) {
            if (DEBUG_MODE) {
                console.log('EmailJS sent successfully');
            }
            return true;
        }
        
        return false;
    } catch (error) {
        if (DEBUG_MODE) {
            console.error('EmailJS error:', error);
        }
        return false;
    }
}

// Dual submission function (GHL + EmailJS)
async function sendDualSubmission(data) {
    const startTime = Date.now();
    
    if (DEBUG_MODE) {
        console.log('📧 Starting dual submission (GHL + EmailJS):', data);
    }
    
    // Execute both submissions in parallel for faster response
    const [webhookSuccess, emailJSSuccess] = await Promise.all([
        sendToWebhook(data),
        sendViaEmailJS(data)
    ]);
    
    const responseTime = Date.now() - startTime;
    
    if (DEBUG_MODE) {
        console.log('Results - GHL Webhook:', webhookSuccess, 'EmailJS:', emailJSSuccess);
        console.log('Response time:', responseTime, 'ms');
    }
    
    // Track performance
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission_performance', {
            ghl_success: webhookSuccess,
            emailjs_success: emailJSSuccess,
            response_time: responseTime,
            form_type: data.form_type
        });
    }
    
    // Success if either method succeeds
    if (webhookSuccess || emailJSSuccess) {
        const methods = [];
        if (webhookSuccess) methods.push('GHL');
        if (emailJSSuccess) methods.push('EmailJS');
        
        if (DEBUG_MODE) {
            console.log(`✅ Form submitted successfully via: ${methods.join(' + ')}`);
        }
        return true;
    }
    
    // Both methods failed
    return false;
}

// Form handling
function handleFormSubmit(form, formType) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Versturen...';
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            city: formData.get('city'),
            product: formData.get('product') || 'Niet gespecificeerd',
            message: formData.get('message') || 'Geen bericht',
            form_type: formType,
            domain: window.location.hostname
        };
        
        try {
            // Send using dual submission (GHL + EmailJS)
            const success = await sendDualSubmission(data);
            
            if (success) {
                // Success message
                showMessage(form, 'success', 'Bedankt! We nemen binnen 24 uur contact met u op.');
                form.reset();
                
                // Track conversion
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'conversion', {
                        'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
                        'value': 1.0,
                        'currency': 'EUR'
                    });
                }
            } else {
                throw new Error('Both submission methods failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showMessage(form, 'error', 'Er ging iets mis. Bel ons op 046-202-1430.');
        } finally {
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        }
    });
}

// Show form messages
function showMessage(form, type, message) {
    // Remove existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.textContent = message;
    
    // Insert after submit button
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.parentNode.insertBefore(messageEl, submitButton.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageEl.remove();
    }, 5000);
}

// Initialize form
if (productContactForm) {
    handleFormSubmit(productContactForm, 'Product Contact Form');
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Navbar height
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe product cards
productCards.forEach(card => {
    card.classList.add('fade-in-up');
    observer.observe(card);
});

// Add form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('error');
                isValid = false;
            }
        }
        
        // Phone validation
        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(input.value)) {
                input.classList.add('error');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Add input event listeners for real-time validation
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
});

// Mobile swipe functionality for products
let isDown = false;
let startX;
let scrollLeft;

if (window.innerWidth <= 768) {
    productsGrid.classList.add('products-carousel');
    
    productsGrid.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - productsGrid.offsetLeft;
        scrollLeft = productsGrid.scrollLeft;
    });
    
    productsGrid.addEventListener('mouseleave', () => {
        isDown = false;
    });
    
    productsGrid.addEventListener('mouseup', () => {
        isDown = false;
    });
    
    productsGrid.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - productsGrid.offsetLeft;
        const walk = (x - startX) * 2;
        productsGrid.scrollLeft = scrollLeft - walk;
    });
}