export class ServicesManager {
  constructor() {
    this.showMoreBtn = document.getElementById('showMoreBtn');
    this.moreServices = document.getElementById('moreServices');
    this.isExpanded = false;
  }

  init() {
    if (!this.showMoreBtn || !this.moreServices) return;

    this.showMoreBtn.addEventListener('click', () => {
      this.toggleServices();
    });

    // Listen for page changes to reset on home page
    document.addEventListener('pagechanged', (e) => {
      if (e.detail.pageId !== 'home' && this.isExpanded) {
        this.collapseServices();
      }
    });
  }

  toggleServices() {
    this.isExpanded = !this.isExpanded;
    this.moreServices.classList.toggle('show');

    if (this.isExpanded) {
      this.showMoreBtn.innerHTML = '<span>Show Less Services</span> <i class="fas fa-chevron-up"></i>';
      this.showMoreBtn.setAttribute('aria-expanded', 'true');
    } else {
      this.showMoreBtn.innerHTML = '<span>Show More Services</span> <i class="fas fa-chevron-down"></i>';
      this.showMoreBtn.setAttribute('aria-expanded', 'false');
    }

    // Scroll to show more button if it's at the bottom
    if (this.isExpanded) {
      setTimeout(() => {
        this.showMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 300);
    }
  }

  expandServices() {
    if (this.isExpanded) return;
    this.toggleServices();
  }

  collapseServices() {
    if (!this.isExpanded) return;
    this.toggleServices();
  }

  isServicesExpanded() {
    return this.isExpanded;
  }
}