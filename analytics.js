// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Track when users click on contact links
  document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('click', function() {
      gtag('event', 'contact_click', {
        'contact_type': this.querySelector('h4').textContent,
        'contact_detail': this.querySelector('p').textContent
      });
      console.log('Contact click tracked:', this.querySelector('h4').textContent);
    });
  });

  // Track when users submit the contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function() {
      gtag('event', 'form_submission', {
        'form_id': 'contact-form'
      });
      console.log('Form submission tracked');
    });
  }

  // Track navigation link clicks
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      gtag('event', 'navigation_click', {
        'link_text': this.textContent,
        'link_url': this.getAttribute('href')
      });
      console.log('Navigation click tracked:', this.textContent);
    });
  });

  // Track social media clicks
  document.querySelectorAll('.social-icons a').forEach(link => {
    link.addEventListener('click', function() {
      gtag('event', 'social_media_click', {
        'platform': this.className.replace('-icon', '')
      });
      console.log('Social media click tracked:', this.className);
    });
  });

  // Cookie consent functionality
  const cookieBanner = document.getElementById('cookie-consent');
  const acceptBtn = document.getElementById('cookie-accept');
  const declineBtn = document.getElementById('cookie-decline');
  
  // Check if user has already made a choice
  const cookieChoice = localStorage.getItem('cookieConsent');
  
  if (cookieChoice === null) {
    // If no choice has been made, show the banner
    cookieBanner.style.display = 'block';
  } else if (cookieChoice === 'accepted') {
    // If cookies were accepted, enable analytics
    enableAnalytics();
  }
  
  // When user accepts cookies
  acceptBtn.addEventListener('click', function() {
    localStorage.setItem('cookieConsent', 'accepted');
    cookieBanner.style.display = 'none';
    enableAnalytics();
  });
  
  // When user declines cookies
  declineBtn.addEventListener('click', function() {
    localStorage.setItem('cookieConsent', 'declined');
    cookieBanner.style.display = 'none';
    disableAnalytics();
  });
  
  // Function to enable analytics
  function enableAnalytics() {
    // The GA code is already loaded, but we can set user consent explicitly
    if (window.gtag) {
      gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
      console.log('Analytics enabled');
    }
  }
  
  // Function to disable analytics
  function disableAnalytics() {
    // Opt-out of analytics
    if (window.gtag) {
      gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
      console.log('Analytics disabled');
    }
  }
}); 