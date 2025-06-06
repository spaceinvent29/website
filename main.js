document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 64, // Adjusted for header height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (menuToggle && menuToggle.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                }
                
                // Update active nav link
                document.querySelectorAll('.main-nav a').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
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
    
    // For custom form (#contact-form): Track form submissions
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.apple-button');
            
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }
            
            // Track form submission in Google Analytics
            if (typeof gtag === 'function') {
                gtag('event', 'form_submission', {
                    'event_category': 'Contact',
                    'event_label': 'Contact Form'
                });
            }
            
            // Submit form after delay to show loading state
            setTimeout(() => {
                this.submit();
            }, 800);
        });
    }
    
    // Automatically adjust textarea height as content grows
    const messageArea = document.getElementById('message');
    if (messageArea) {
        messageArea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
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
    
    // Form handling for inputs
    const formInputs = document.querySelectorAll('.input-group input, .input-group textarea');
    
    if (formInputs.length) {
        formInputs.forEach(input => {
            // Initial check for values (for page refreshes, etc.)
            if (input.value.trim() !== '') {
                input.classList.add('has-value');
            }
            
            // Input event listener to track changes
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
        });
    }
    
    // Fix for the label animation
    const formInputs = document.querySelectorAll('.input-group input, .input-group textarea');
    
    formInputs.forEach(input => {
        // Check if field already has value
        if (input.value.trim() !== '') {
            input.nextElementSibling.classList.add('filled');
        }
        
        // When input gets focus
        input.addEventListener('focus', function() {
            this.setAttribute('placeholder', ' '); // Space placeholder
        });
        
        // When input loses focus
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.setAttribute('placeholder', ''); // Empty placeholder
            }
        });
    });
    
    // Active navigation based on scroll position
    function updateActiveNavOnScroll() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.main-nav a').forEach(navLink => {
                    navLink.classList.remove('active');
                    if (navLink.getAttribute('href') === `#${sectionId}`) {
                        navLink.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavOnScroll);
    updateActiveNavOnScroll(); // Run on page load
}); 