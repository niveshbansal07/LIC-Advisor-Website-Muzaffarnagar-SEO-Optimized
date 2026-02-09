// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// FAQ Accordion Functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    }
});

// Consultation Form Handling
const consultationForm = document.getElementById('consultationForm');

if (consultationForm) {
    consultationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            mobile: document.getElementById('mobile').value,
            email: document.getElementById('email').value,
            plan: document.getElementById('plan').value,
            message: document.getElementById('message').value
        };
        
        // Validate required fields
        if (!formData.name || !formData.mobile) {
            alert('Please fill in all required fields (Name and Mobile Number).');
            return;
        }
        
        // Validate mobile number (10 digits)
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(formData.mobile.replace(/\D/g, ''))) {
            alert('Please enter a valid 10-digit mobile number.');
            return;
        }
        
        // Create mailto link
        const subject = encodeURIComponent('Free LIC Consultation Request - ' + formData.name);
        const body = encodeURIComponent(
            'Name: ' + formData.name + '\n' +
            'Mobile: ' + formData.mobile + '\n' +
            'Email: ' + (formData.email || 'Not provided') + '\n' +
            'Interested Plan: ' + (formData.plan || 'Not specified') + '\n\n' +
            'Message:\n' + (formData.message || 'No message provided')
        );
        
        const mailtoLink = 'mailto:vishal.nivesh@gmail.com?subject=' + subject + '&body=' + body;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        setTimeout(() => {
            alert('Thank you for your interest! Your consultation request has been sent. We will contact you shortly.');
            consultationForm.reset();
        }, 500);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animate elements on scroll (simple fade-in)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe plan cards and why cards for animation
document.querySelectorAll('.plan-card, .why-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Phone number formatting (optional enhancement)
const mobileInput = document.getElementById('mobile');
if (mobileInput) {
    mobileInput.addEventListener('input', function(e) {
        // Remove all non-digits
        let value = e.target.value.replace(/\D/g, '');
        
        // Limit to 10 digits
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        e.target.value = value;
    });
}

// Add loading state to form submission
if (consultationForm) {
    const submitButton = consultationForm.querySelector('.btn-submit');
    
    consultationForm.addEventListener('submit', function() {
        if (submitButton) {
            submitButton.style.opacity = '0.7';
            submitButton.style.pointerEvents = 'none';
            submitButton.textContent = 'Sending...';
            
            setTimeout(() => {
                submitButton.style.opacity = '1';
                submitButton.style.pointerEvents = 'auto';
                submitButton.textContent = 'Get Free LIC Consultation';
            }, 2000);
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Prevent fixed buttons from overlapping on very small screens
window.addEventListener('resize', () => {
    const fixedWhatsApp = document.querySelector('.fixed-whatsapp');
    const fixedCall = document.querySelector('.fixed-call');
    
    if (window.innerWidth < 480) {
        if (fixedWhatsApp && fixedCall) {
            const whatsAppBottom = parseInt(window.getComputedStyle(fixedWhatsApp).bottom);
            const callBottom = parseInt(window.getComputedStyle(fixedCall).bottom);
            const whatsAppHeight = fixedWhatsApp.offsetHeight;
            
            if (callBottom + fixedCall.offsetHeight > whatsAppBottom) {
                fixedWhatsApp.style.bottom = (callBottom + fixedCall.offsetHeight + 10) + 'px';
            }
        }
    }
});
