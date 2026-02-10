import { formatPhoneNumber, validateEmail, validatePhone, showToast } from '../utils/helpers.js';

export class BookingManager {
  constructor() {
    this.bookingForm = document.getElementById('bookingForm');
    this.bookingModal = document.getElementById('bookingModal');
    this.modalCloseBtn = document.getElementById('modalCloseBtn');
    this.newBookingBtn = document.getElementById('newBookingBtn');
    this.modalCloseX = document.querySelector('.modal-close');
    this.isSubmitting = false;
  }

  init() {
    if (!this.bookingForm) return;

    // Form submission
    this.bookingForm.addEventListener('submit', (e) => {
      this.handleSubmit(e);
    });

    // Modal close buttons
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => this.closeModal());
    }
    
    if (this.modalCloseX) {
      this.modalCloseX.addEventListener('click', () => this.closeModal());
    }
    
    if (this.newBookingBtn) {
      this.newBookingBtn.addEventListener('click', () => {
        this.closeModal();
        // Navigate to booking page
        const event = new CustomEvent('navigate', { detail: { page: 'booking' } });
        document.dispatchEvent(event);
      });
    }

    // Close modal on outside click
    window.addEventListener('click', (e) => {
      if (e.target === this.bookingModal) {
        this.closeModal();
      }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.bookingModal.style.display === 'block') {
        this.closeModal();
      }
    });

    // Set min date for date input
    this.setMinDate();

    // Listen for page changes to reset form
    document.addEventListener('pagechanged', (e) => {
      if (e.detail.pageId === 'booking') {
        this.resetForm();
        this.setMinDate();
      }
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    
    // Get form data
    const formData = this.getFormData();
    
    // Validate form
    const validation = this.validateForm(formData);
    if (!validation.isValid) {
      this.showFormError(validation.message);
      this.isSubmitting = false;
      return;
    }
    
    // Show loading state
    const submitButton = this.bookingForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitButton.disabled = true;
    
    try {
      // Save to Firebase (if implemented)
      const bookingId = await this.saveBooking(formData);
      
      // Show success modal
      this.showSuccessModal(formData, bookingId);
      
      // Reset form
      this.resetForm();
      
      // Log to analytics (if implemented)
      this.logBooking(formData);
      
    } catch (error) {
      console.error('Booking submission error:', error);
      showToast('There was an error submitting your booking. Please try again or call us directly.', 'error');
    } finally {
      // Restore button
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
      this.isSubmitting = false;
    }
  }

  getFormData() {
    return {
      name: document.getElementById('fullName').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      service: document.getElementById('serviceType').value,
      serviceText: document.getElementById('serviceType').options[document.getElementById('serviceType').selectedIndex].text,
      propertyType: document.getElementById('propertyType').value,
      propertySize: document.getElementById('propertySize').value || 'Not specified',
      preferredDate: document.getElementById('preferredDate').value || 'Not specified',
      message: document.getElementById('message').value.trim() || 'No additional details',
      timestamp: new Date().toISOString(),
      status: 'pending',
      source: 'website'
    };
  }

  validateForm(formData) {
    // Check required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.propertyType) {
      return { isValid: false, message: 'Please fill in all required fields marked with *' };
    }
    
    // Validate email
    if (!validateEmail(formData.email)) {
      return { isValid: false, message: 'Please enter a valid email address' };
    }
    
    // Validate phone
    if (!validatePhone(formData.phone)) {
      return { isValid: false, message: 'Please enter a valid 10-digit Indian phone number' };
    }
    
    return { isValid: true };
  }

  showFormError(message) {
    // Remove existing error message
    const existingError = document.querySelector('.form-error');
    if (existingError) existingError.remove();
    
    // Create error element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
      </div>
    `;
    
    // Insert before form
    this.bookingForm.insertBefore(errorDiv, this.bookingForm.firstChild);
    
    // Scroll to error
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove error after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.style.opacity = '0';
        errorDiv.style.transition = 'opacity 0.3s ease';
        setTimeout(() => errorDiv.remove(), 300);
      }
    }, 5000);
  }

  async saveBooking(formData) {
    // Format phone number
    const cleanPhone = formData.phone.replace(/\D/g, '');
    formData.phone = cleanPhone;
    
    // Generate booking ID
    const bookingId = 'ZOLVEX-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    formData.bookingId = bookingId;
    
    // Check if Firebase is available
    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
      try {
        const db = firebase.firestore();
        const docRef = await db.collection('bookings').add({
          ...formData,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Booking saved to Firebase with ID:', docRef.id);
        return bookingId;
      } catch (error) {
        console.error('Firebase save error:', error);
        // Fallback to localStorage
        return this.saveToLocalStorage(formData);
      }
    } else {
      // Fallback to localStorage
      return this.saveToLocalStorage(formData);
    }
  }

  saveToLocalStorage(formData) {
    const bookings = JSON.parse(localStorage.getItem('zolvex_bookings') || '[]');
    bookings.push(formData);
    localStorage.setItem('zolvex_bookings', JSON.stringify(bookings));
    console.log('Booking saved to localStorage');
    return formData.bookingId;
  }

  showSuccessModal(formData, bookingId) {
    // Update modal content
    document.getElementById('customerName').textContent = formData.name;
    document.getElementById('customerPhone').textContent = formatPhoneNumber(formData.phone);
    document.getElementById('customerEmail').textContent = formData.email;
    
    // Add booking ID to modal
    const detailsContainer = document.querySelector('.confirmation-details');
    const bookingIdElement = document.createElement('div');
    bookingIdElement.className = 'detail-item';
    bookingIdElement.innerHTML = `
      <i class="fas fa-receipt"></i>
      <div>
        <strong>Booking Reference</strong>
        <p class="highlight">${bookingId}</p>
      </div>
    `;
    detailsContainer.appendChild(bookingIdElement);
    
    // Show modal
    this.bookingModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Clear booking ID from modal when closed
    this.bookingModal.addEventListener('click', () => {
      if (bookingIdElement.parentNode) {
        bookingIdElement.remove();
      }
    }, { once: true });
  }

  closeModal() {
    this.bookingModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Clear booking ID from modal
    const bookingIdElement = document.querySelector('.confirmation-details .detail-item:last-child');
    if (bookingIdElement && bookingIdElement.querySelector('.fa-receipt')) {
      bookingIdElement.remove();
    }
  }

  setMinDate() {
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
    }
  }

  resetForm() {
    if (this.bookingForm) {
      this.bookingForm.reset();
    }
  }

  logBooking(formData) {
    // Google Analytics event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'booking_submitted', {
        'event_category': 'engagement',
        'event_label': formData.service
      });
    }
    
    // Facebook Pixel event
    if (typeof fbq !== 'undefined') {
      fbq('track', 'CompleteRegistration');
    }
  }

  getBookings() {
    return JSON.parse(localStorage.getItem('zolvex_bookings') || '[]');
  }

  clearBookings() {
    localStorage.removeItem('zolvex_bookings');
  }
}