// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger");
const mainNav = document.getElementById("mainNav");

hamburger.addEventListener("click", () => {
  mainNav.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Page Navigation
document.querySelectorAll("[data-page]").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const pageId = this.getAttribute("data-page");

    // Hide all page content
    document.querySelectorAll(".page-content").forEach((page) => {
      page.classList.remove("active");
    });

    // Show selected page
    document.getElementById(pageId).classList.add("active");

    // Update active navigation
    document.querySelectorAll("nav a").forEach((navLink) => {
      navLink.classList.remove("active");
    });

    // If it's a navigation link, set it as active
    if (
      this.tagName === "A" &&
      this.parentElement.parentElement.tagName === "NAV"
    ) {
      this.classList.add("active");
    } else {
      // Find corresponding nav link and set it as active
      const navLink = document.querySelector(`nav a[data-page="${pageId}"]`);
      if (navLink) {
        navLink.classList.add("active");
      }
    }

    // Scroll to top of page
    window.scrollTo(0, 0);
  });
});

// Show More Services functionality
const showMoreBtn = document.getElementById("showMoreBtn");
const moreServices = document.getElementById("moreServices");

if (showMoreBtn) {
  showMoreBtn.addEventListener("click", () => {
    moreServices.classList.toggle("show");

    if (moreServices.classList.contains("show")) {
      showMoreBtn.innerHTML =
        '<span>Show Less Services</span> <i class="fas fa-chevron-up"></i>';
    } else {
      showMoreBtn.innerHTML =
        '<span>Show More Services</span> <i class="fas fa-chevron-down"></i>';
    }
  });
}

// FAQ Accordion
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.parentElement;
    faqItem.classList.toggle("active");
  });
});

// Booking Form Submission

// Booking Form Submission with Modal
const bookingForm = document.getElementById("bookingForm");
const bookingModal = document.getElementById("bookingModal");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const newBookingBtn = document.getElementById("newBookingBtn");
const modalCloseX = document.querySelector(".modal-close");

if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const formData = {
      name: document.getElementById("fullName").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      service: document.getElementById("serviceType").value,
      propertyType: document.getElementById("propertyType").value,
      propertySize: document.getElementById("propertySize").value,
      date: document.getElementById("preferredDate").value,
      message: document.getElementById("message").value.trim(),
    };

    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.service ||
      !formData.propertyType
    ) {
      showFormError("Please fill in all required fields marked with *");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showFormError("Please enter a valid email address");
      return;
    }

    // Validate phone number (basic Indian phone validation)
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10 || !phoneRegex.test(cleanPhone)) {
      showFormError("Please enter a valid 10-digit Indian phone number");
      return;
    }

    // Set modal content with form data
    document.getElementById("customerName").textContent = formData.name;
    document.getElementById("customerPhone").textContent =
      formatPhoneNumber(cleanPhone);
    document.getElementById("customerEmail").textContent = formData.email;

    // Show modal
    bookingModal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling

    // Reset form after successful submission
    setTimeout(() => {
      bookingForm.reset();
    }, 300);

    // Log submission (in real app, send to server)
    console.log("Booking submitted:", formData);
  });
}

// Function to show form error
function showFormError(message) {
  // Remove any existing error message
  const existingError = document.querySelector(".form-error");
  if (existingError) existingError.remove();

  // Create error element
  const errorDiv = document.createElement("div");
  errorDiv.className = "form-error";
  errorDiv.innerHTML = `
        <div style="background-color: #ffebee; color: #c62828; padding: 1rem; border-radius: 4px; 
                    border-left: 4px solid #c62828; margin-bottom: 1.5rem; display: flex; 
                    align-items: center; gap: 0.8rem;">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        </div>
    `;

  // Insert before form
  bookingForm.insertBefore(errorDiv, bookingForm.firstChild);

  // Scroll to error
  errorDiv.scrollIntoView({ behavior: "smooth", block: "center" });

  // Remove error after 5 seconds
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.style.opacity = "0";
      errorDiv.style.transition = "opacity 0.3s ease";
      setTimeout(() => errorDiv.remove(), 300);
    }
  }, 5000);
}

// Format phone number for display
function formatPhoneNumber(phone) {
  return `+91 ${phone.substring(0, 5)} ${phone.substring(5)}`;
}

// Modal Close Functions
function closeModal() {
  bookingModal.style.display = "none";
  document.body.style.overflow = "auto"; // Re-enable scrolling
}

// Event listeners for modal close buttons
if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
if (modalCloseX) modalCloseX.addEventListener("click", closeModal);
if (newBookingBtn)
  newBookingBtn.addEventListener("click", () => {
    closeModal();
    // Optional: Scroll to booking form
    document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
  });

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === bookingModal) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && bookingModal.style.display === "block") {
    closeModal();
  }
});

// Set minimum date for booking form to today
const today = new Date().toISOString().split("T")[0];
const dateInput = document.getElementById("preferredDate");
if (dateInput) {
  dateInput.min = today;
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !mainNav.contains(e.target)) {
    mainNav.classList.remove("active");
    hamburger.classList.remove("active");
  }
});
