document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (menuToggle && menuToggle.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // For iframe form: Listen for the iframe to load
    const formIframe = document.querySelector('.google-form-container iframe');
    
    if (formIframe) {
        // Track form views
        if (typeof gtag === 'function') {
            gtag('event', 'form_view', {
                'event_category': 'Contact',
                'event_label': 'Google Form View'
            });
        }
        
        // Try to track form submissions by listening for iframe navigation
        formIframe.addEventListener('load', function() {
            // This will fire when the iframe loads initially and after submission
            // You might need a flag to track only submissions
            if (this.submissionTracked) return;
            
            // Set a timeout to check if the URL changed (indicating form submission)
            setTimeout(() => {
                if (typeof gtag === 'function') {
                    gtag('event', 'form_submission', {
                        'event_category': 'Contact',
                        'event_label': 'Google Form Submission'
                    });
                    this.submissionTracked = true;
                }
            }, 2000);
        });
    }
    
    // For custom form: Track form submissions
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Track submission in Google Analytics
            if (typeof gtag === 'function') {
                gtag('event', 'form_submission', {
                    'event_category': 'Contact',
                    'event_label': 'Contact Form'
                });
            }
        });
    }
}); 