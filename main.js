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
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjusted for header height
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
            // Prevent immediate submission
            e.preventDefault();
            
            // Get the button
            const submitButton = this.querySelector('.cta-button.primary');
            
            // Update button to show submission is in progress
            if (submitButton) {
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<span class="button-text">Sending...</span>';
                submitButton.disabled = true;
                submitButton.classList.add('submitting');
            }
            
            // Track submission in Google Analytics
            if (typeof gtag === 'function') {
                gtag('event', 'form_submission', {
                    'event_category': 'Contact',
                    'event_label': 'Contact Form'
                });
            }
            
            // Submit the form after a slight delay to show the "Sending..." state
            setTimeout(() => {
                this.submit();
                
                // Reset button after submission (in case they navigate back)
                if (submitButton) {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.classList.remove('submitting');
                }
            }, 800);
        });
    }
    
    // EXACT FORM JAVASCRIPT FROM BACKUP - Add original form JavaScript here
    
    // Header scroll effect
    const header = document.querySelector('.site-header');
    
    function updateHeader() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(10, 10, 20, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(10, 10, 20, 0.8)';
            header.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', updateHeader);
    updateHeader(); // Run once on load
    
    // Form field animations
    const formControls = document.querySelectorAll('.form-control');
    
    if (formControls.length) {
        formControls.forEach(control => {
            // Add focus effect
            control.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            // Remove focus effect
            control.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                // Add 'has-value' class if the field has a value
                if (this.value.trim() !== '') {
                    this.parentElement.classList.add('has-value');
                } else {
                    this.parentElement.classList.remove('has-value');
                }
            });
            
            // Check on load if fields have values
            if (control.value.trim() !== '') {
                control.parentElement.classList.add('has-value');
            }
        });
    }
}); 