// Extremely minimal analytics tracking
document.addEventListener('DOMContentLoaded', function() {
  // Just log page views by default
  console.log('Page viewed');
});

// Minimal analytics event tracking
document.addEventListener('DOMContentLoaded', function() {
  // Track form submissions
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function() {
      if (window.gtag) {
        gtag('event', 'form_submission', {
          'form_id': 'contact_form'
        });
      }
    });
  }
}); 