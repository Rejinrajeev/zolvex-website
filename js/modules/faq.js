export class FAQManager {
  constructor() {
    this.faqItems = document.querySelectorAll('.faq-item');
  }

  init() {
    if (!this.faqItems.length) return;

    this.faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        this.toggleFAQ(item);
      });

      // Add keyboard support
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleFAQ(item);
        }
      });
    });

    // Close other FAQs when one opens
    document.addEventListener('faqToggled', (e) => {
      if (e.detail.isOpen) {
        this.closeOtherFAQs(e.detail.faqId);
      }
    });
  }

  toggleFAQ(faqItem) {
    const isOpening = !faqItem.classList.contains('active');
    
    // Close all other FAQs if this one is opening
    if (isOpening) {
      this.closeOtherFAQs(faqItem.id || faqItem.dataset.id);
    }
    
    faqItem.classList.toggle('active');
    
    // Dispatch custom event
    const event = new CustomEvent('faqToggled', {
      detail: {
        faqId: faqItem.id || faqItem.dataset.id,
        isOpen: faqItem.classList.contains('active')
      }
    });
    document.dispatchEvent(event);
    
    // Update aria attributes
    const question = faqItem.querySelector('.faq-question');
    const answer = faqItem.querySelector('.faq-answer');
    const isExpanded = faqItem.classList.contains('active');
    
    question.setAttribute('aria-expanded', isExpanded);
    answer.setAttribute('aria-hidden', !isExpanded);
  }

  closeOtherFAQs(currentFaqId) {
    this.faqItems.forEach(item => {
      const itemId = item.id || item.dataset.id;
      if (itemId !== currentFaqId && item.classList.contains('active')) {
        item.classList.remove('active');
        
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        question.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');
      }
    });
  }

  openFAQ(faqId) {
    const faqItem = document.getElementById(faqId) || 
                   document.querySelector(`[data-id="${faqId}"]`);
    if (faqItem && !faqItem.classList.contains('active')) {
      this.toggleFAQ(faqItem);
    }
  }

  closeFAQ(faqId) {
    const faqItem = document.getElementById(faqId) || 
                   document.querySelector(`[data-id="${faqId}"]`);
    if (faqItem && faqItem.classList.contains('active')) {
      this.toggleFAQ(faqItem);
    }
  }

  getAllFAQs() {
    return Array.from(this.faqItems).map(item => ({
      id: item.id || item.dataset.id,
      question: item.querySelector('.faq-question').textContent.trim(),
      answer: item.querySelector('.faq-answer').textContent.trim(),
      isOpen: item.classList.contains('active')
    }));
  }
}