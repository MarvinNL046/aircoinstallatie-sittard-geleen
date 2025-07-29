// Main JavaScript file

// Initialize EmailJS
(function() {
    // Initialize EmailJS with public key
    emailjs.init('sjJ8kK6U9wFjY0zX9');
})();

// GoHighLevel Webhook Configuration
const GHL_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/k90zUH3RgEQLfj7Yc55b/webhook-trigger/54670718-ea44-43a1-a81a-680ab3d5f67f";
const DEBUG_MODE = false;

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const typewriter = document.getElementById('typewriter');
const heroForm = document.getElementById('heroForm');
const contactForm = document.getElementById('contactForm');

// Typewriter Effect
const locations = ['Sittard-Geleen', 'Heerlen', 'Maastricht', 'Roermond', 'heel Limburg'];
let locationIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterSpeed = 100;

function typeWrite() {
    const currentLocation = locations[locationIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentLocation.substring(0, charIndex - 1);
        charIndex--;
        typewriterSpeed = 50;
    } else {
        typewriter.textContent = currentLocation.substring(0, charIndex + 1);
        charIndex++;
        typewriterSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentLocation.length) {
        isDeleting = true;
        typewriterSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        locationIndex = (locationIndex + 1) % locations.length;
        typewriterSpeed = 500; // Pause before new word
    }
    
    setTimeout(typeWrite, typewriterSpeed);
}

// Start typewriter effect
if (typewriter) {
    typeWrite();
}

// Navbar Scroll Effect
let lastScroll = 0;
const heroSection = document.querySelector('.hero');

function handleScroll() {
    const currentScroll = window.scrollY;
    
    // Show/hide navbar based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    // Transparent navbar on hero section
    if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (currentScroll < heroBottom - 100) {
            navbar.classList.add('transparent');
        } else {
            navbar.classList.remove('transparent');
        }
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

// Smooth Scroll for Anchor Links
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

// Form Handling with EmailJS
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
            service: formData.get('service') || 'Niet gespecificeerd',
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

// Send data to GoHighLevel webhook
async function sendToWebhook(data) {
    try {
        const webhookData = {
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                city: data.city || '',
                message: data.message
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
            service: data.service || 'Niet gespecificeerd',
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

// Initialize forms
if (heroForm) {
    handleFormSubmit(heroForm, 'Hero Form');
}

if (contactForm) {
    handleFormSubmit(contactForm, 'Contact Form');
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.service-card, .benefit-card, .brand-item').forEach(el => {
    observer.observe(el);
});

// Lazy Loading Images
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading
    lazyImages.forEach(img => {
        img.classList.add('lazy', 'loaded');
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });
}

// Performance Monitoring
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Log performance metrics
        if (window.performance && performance.getEntriesByType) {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
        }
    });
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // You could send errors to a logging service here
});

// Service Worker Registration (for PWA)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('ServiceWorker registration failed:', err);
        });
    });
}

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

// Add fade-in-up class to elements on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .benefit-card, .brand-item, .section-header');
    animatedElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
});