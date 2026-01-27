
        // Mobile Navigation Toggle
        const hamburger = document.getElementById('hamburger');
        const mainNav = document.getElementById('mainNav');
        
        hamburger.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Page Navigation
        document.querySelectorAll('[data-page]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const pageId = this.getAttribute('data-page');
                
                // Hide all page content
                document.querySelectorAll('.page-content').forEach(page => {
                    page.classList.remove('active');
                });
                
                // Show selected page
                document.getElementById(pageId).classList.add('active');
                
                // Update active navigation
                document.querySelectorAll('nav a').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                
                // If it's a navigation link, set it as active
                if (this.tagName === 'A' && this.parentElement.parentElement.tagName === 'NAV') {
                    this.classList.add('active');
                } else {
                    // Find corresponding nav link and set it as active
                    const navLink = document.querySelector(`nav a[data-page="${pageId}"]`);
                    if (navLink) {
                        navLink.classList.add('active');
                    }
                }
                
                // Scroll to top of page
                window.scrollTo(0, 0);
            });
        });
        
        // Show More Services functionality
        const showMoreBtn = document.getElementById('showMoreBtn');
        const moreServices = document.getElementById('moreServices');
        
        if (showMoreBtn) {
            showMoreBtn.addEventListener('click', () => {
                moreServices.classList.toggle('show');
                
                if (moreServices.classList.contains('show')) {
                    showMoreBtn.innerHTML = '<span>Show Less Services</span> <i class="fas fa-chevron-up"></i>';
                } else {
                    showMoreBtn.innerHTML = '<span>Show More Services</span> <i class="fas fa-chevron-down"></i>';
                }
            });
        }
        
        // FAQ Accordion
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                faqItem.classList.toggle('active');
            });
        });
        
        // Booking Form Submission
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const formData = {
                    name: document.getElementById('fullName').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    service: document.getElementById('serviceType').value,
                    propertyType: document.getElementById('propertyType').value,
                    propertySize: document.getElementById('propertySize').value,
                    date: document.getElementById('preferredDate').value,
                    message: document.getElementById('message').value
                };
                
                // In a real application, you would send this data to a server
                // For this demo, we'll just show a confirmation message
                alert(`Thank you for your booking request, ${formData.name}! We have received your information and will contact you within 24 hours at ${formData.phone} or ${formData.email} to confirm details and provide pricing.`);
                
                // Reset form
                bookingForm.reset();
            });
        }
        
        // Set minimum date for booking form to today
        const today = new Date().toISOString().split('T')[0];
        const dateInput = document.getElementById('preferredDate');
        if (dateInput) {
            dateInput.min = today;
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !mainNav.contains(e.target)) {
                mainNav.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
