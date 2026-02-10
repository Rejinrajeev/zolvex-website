// Main Application Entry Point
import { VercelRouter } from './modules/router.js';
import { MobileNavigation } from './modules/mobile-nav.js';
import { ServicesManager } from './modules/services.js';
import { FAQManager } from './modules/faq.js';
import { BookingManager } from './modules/booking.js';
import { FirebaseManager } from './modules/firebase.js';
import { showToast } from './utils/helpers.js';

class ZolvexApp {
  constructor() {
    this.router = new VercelRouter();
    this.mobileNav = new MobileNavigation();
    this.servicesManager = new ServicesManager();
    this.faqManager = new FAQManager();
    this.bookingManager = new BookingManager();
    this.firebaseManager = new FirebaseManager();
    this.isInitialized = false;
  }

  async init() {
    try {
      // Initialize modules
      await this.initializeModules();
      
      // Set up global error handling
      this.setupErrorHandling();
      
      // Set up offline detection
      this.setupOfflineDetection();
      
      // Set up service worker for PWA
      this.setupServiceWorker();
      
      this.isInitialized = true;
      
      console.log('Zolvex App initialized successfully');
      showToast('Welcome to Zolvex!', 'success');
      
    } catch (error) {
      console.error('App initialization error:', error);
      showToast('Failed to initialize app. Please refresh the page.', 'error');
    }
  }

  async initializeModules() {
    // Initialize Firebase first
    await this.firebaseManager.init();
    
    // Initialize router
    this.router.init();
    
    // Initialize other modules
    this.mobileNav.init();
    this.servicesManager.init();
    this.faqManager.init();
    this.bookingManager.init();
    
    // Set up custom event listeners
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Listen for navigation events
    document.addEventListener('navigate', (e) => {
      if (e.detail && e.detail.page) {
        this.router.navigateByPageId(e.detail.page, true);
      }
    });
    
    // Listen for booking form submission success
    document.addEventListener('bookingSuccess', (e) => {
      console.log('Booking successful:', e.detail);
      // You can add analytics or other tracking here
    });
    
    // Listen for service expansion
    document.addEventListener('servicesExpanded', (e) => {
      console.log('Services expanded:', e.detail);
    });
  }

  setupErrorHandling() {
    // Global error handler
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
      // You can send errors to a logging service here
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
      // You can send errors to a logging service here
    });
  }

  setupOfflineDetection() {
    window.addEventListener('online', () => {
      showToast('You are back online!', 'success');
      // Sync any pending data
      this.firebaseManager.syncLocalBookings();
    });
    
    window.addEventListener('offline', () => {
      showToast('You are offline. Some features may be limited.', 'warning');
    });
  }

  async setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered');
      } catch (error) {
        console.warn('Service Worker registration failed:', error);
      }
    }
  }

  getRouter() {
    return this.router;
  }

  getFirebaseManager() {
    return this.firebaseManager;
  }

  getCurrentPage() {
    return this.router.getCurrentPage();
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  const app = new ZolvexApp();
  window.ZolvexApp = app; // Make app available globally for debugging
  
  await app.init();
  
  // Check if user is offline
  if (!navigator.onLine) {
    showToast('You are offline. Some features may be limited.', 'warning');
  }
});

// Export for module usage
export { ZolvexApp };