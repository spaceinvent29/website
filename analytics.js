// Simple analytics tracking
document.addEventListener('DOMContentLoaded', function() {
    // Cookie consent functionality
    const cookieBanner = document.getElementById('cookie-consent');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');
    
    // Only show banner if it exists
    if (cookieBanner) {
        // Check if user has already made a choice
        const cookieChoice = localStorage.getItem('cookieConsent');
        
        if (cookieChoice === null) {
            // If no choice has been made, show the banner
            cookieBanner.style.display = 'block';
        }
        
        // When user accepts cookies
        if (acceptBtn) {
            acceptBtn.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'accepted');
                cookieBanner.style.display = 'none';
                // Enable analytics
                if (window.gtag) {
                    gtag('consent', 'update', {
                        'analytics_storage': 'granted'
                    });
                }
            });
        }
        
        // When user declines cookies
        if (declineBtn) {
            declineBtn.addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'declined');
                cookieBanner.style.display = 'none';
                // Disable analytics
                if (window.gtag) {
                    gtag('consent', 'update', {
                        'analytics_storage': 'denied'
                    });
                }
            });
        }
    }
    
    // Simple event tracking that won't interfere with existing functionality
    // Track contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const originalSubmit = contactForm.onsubmit;
        contactForm.onsubmit = function(e) {
            if (window.gtag) {
                gtag('event', 'form_submission', {
                    'form_id': 'contact-form'
                });
            }
            if (originalSubmit) return originalSubmit.call(this, e);
        };
    }
}); 