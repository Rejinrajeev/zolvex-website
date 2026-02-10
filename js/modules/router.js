import { showToast } from '../utils/helpers.js';

export class VercelRouter {
  constructor() {
    this.routes = {
      '/': 'home',
      '/home': 'home',
      '/about': 'about',
      '/services': 'services',
      '/booking': 'booking',
      '/faq': 'faq',
      '/privacy-policy': 'privacy',
      '/terms-conditions': 'terms'
    };

    this.pageTitles = {
      home: 'Home - ZOLVEX | Ready to Revive',
      about: 'About Us - ZOLVEX | Ready to Revive',
      services: 'Services - ZOLVEX | Ready to Revive',
      booking: 'Book a Service - ZOLVEX | Ready to Revive',
      faq: 'FAQ - ZOLVEX | Ready to Revive',
      privacy: 'Privacy Policy - ZOLVEX | Ready to Revive',
      terms: 'Terms & Conditions - ZOLVEX | Ready to Revive'
    };

    this.currentPage = null;
  }

  init() {
    // Handle initial page load
    this.handleRoute(window.location.pathname);

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      this.handleRoute(window.location.pathname);
    });

    // Handle all link clicks
    document.addEventListener('click', (e) => {
      this.handleLinkClick(e);
    });

    // Log initialization
    console.log('Router initialized');
  }

  handleLinkClick(e) {
    // Check if it's a regular link
    if (e.target.matches('a[href^="/"]') && 
        !e.target.matches('a[href^="http"]') &&
        !e.target.matches('a[download]')) {
      e.preventDefault();
      const path = e.target.getAttribute('href');
      this.navigate(path, true);
    }

    // Also handle data-page links
    const dataPageLink = e.target.closest('[data-page]');
    if (dataPageLink && dataPageLink.hasAttribute('data-page')) {
      e.preventDefault();
      const pageId = dataPageLink.getAttribute('data-page');
      this.navigateByPageId(pageId, true);
    }
  }

  navigate(path, updateHistory = true) {
    // Clean the path
    if (path === '' || path === '/index.html') path = '/';
    
    // Get page ID from route
    const pageId = this.routes[path] || 'home';
    
    // Show the page
    this.showPage(pageId);
    
    // Update URL if needed
    if (updateHistory && path !== window.location.pathname) {
      history.pushState({ pageId }, '', path);
    }
    
    // Update active navigation
    this.updateActiveNav(pageId);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update page title
    this.updatePageTitle(pageId);
    
    // Store current page
    this.currentPage = pageId;
    
    // Dispatch custom event
    this.dispatchPageChangeEvent(pageId);
  }

  navigateByPageId(pageId, updateHistory = true) {
    // Find path for page ID
    const path = Object.keys(this.routes).find(key => this.routes[key] === pageId) || '/';
    this.navigate(path, updateHistory);
  }

  handleRoute(path) {
    this.navigate(path, false);
  }

  showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
      page.classList.remove('active');
    });
    
    // Show requested page
    const page = document.getElementById(pageId);
    if (page) {
      page.classList.add('active');
      
      // Dispatch page-specific events
      this.handlePageSpecificEvents(pageId);
    }
  }

  handlePageSpecificEvents(pageId) {
    switch(pageId) {
      case 'booking':
        this.handleBookingPage();
        break;
      case 'home':
        this.handleHomePage();
        break;
      // Add more page-specific handlers as needed
    }
  }

  handleBookingPage() {
    // Set minimum date for booking form
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
    }
    
    // Reset booking form if needed
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
      bookingForm.reset();
    }
  }

  handleHomePage() {
    // Reset show more services if expanded
    const moreServices = document.getElementById('moreServices');
    const showMoreBtn = document.getElementById('showMoreBtn');
    if (moreServices && showMoreBtn) {
      moreServices.classList.remove('show');
      showMoreBtn.innerHTML = '<span>Show More Services</span> <i class="fas fa-chevron-down"></i>';
    }
  }

  updateActiveNav(pageId) {
    // Remove active from all nav links
    document.querySelectorAll('nav a').forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active to current page link
    const activeNavLink = document.querySelector(`nav a[data-page="${pageId}"]`);
    if (activeNavLink) {
      activeNavLink.classList.add('active');
    }
    
    // Also update footer links if they exist
    const path = Object.keys(this.routes).find(key => this.routes[key] === pageId);
    if (path) {
      const footerLinks = document.querySelectorAll(`footer a[href="${path}"]`);
      footerLinks.forEach(link => {
        link.classList.add('active');
      });
    }
  }

  updatePageTitle(pageId) {
    document.title = this.pageTitles[pageId] || 'ZOLVEX | Ready to Revive';
  }

  dispatchPageChangeEvent(pageId) {
    const event = new CustomEvent('pagechanged', {
      detail: { pageId }
    });
    document.dispatchEvent(event);
  }

  getCurrentPage() {
    return this.currentPage;
  }
}