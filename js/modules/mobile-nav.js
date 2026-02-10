export class MobileNavigation {
  constructor() {
    this.hamburger = document.getElementById('hamburger');
    this.mainNav = document.getElementById('mainNav');
    this.isOpen = false;
  }

  init() {
    if (!this.hamburger || !this.mainNav) return;

    // Hamburger click event
    this.hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    // Close menu when clicking on a link
    document.querySelectorAll('nav a').forEach((link) => {
      link.addEventListener('click', () => {
        this.closeMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.hamburger.contains(e.target) && !this.mainNav.contains(e.target)) {
        this.closeMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });

    // Close menu on page change (for SPA)
    document.addEventListener('pagechanged', () => {
      this.closeMenu();
    });
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.mainNav.classList.toggle('active');
    this.hamburger.classList.toggle('active');
    
    // Toggle body scroll
    document.body.style.overflow = this.isOpen ? 'hidden' : '';
  }

  closeMenu() {
    if (!this.isOpen) return;
    
    this.isOpen = false;
    this.mainNav.classList.remove('active');
    this.hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  isMenuOpen() {
    return this.isOpen;
  }
}