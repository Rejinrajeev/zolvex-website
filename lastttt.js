// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger");
const mainNav = document.getElementById("mainNav");

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
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

    // Validate phone number
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10 || !phoneRegex.test(cleanPhone)) {
      showFormError("Please enter a valid 10-digit Indian phone number");
      return;
    }

    // Set modal content
    document.getElementById("customerName").textContent = formData.name;
    document.getElementById("customerPhone").textContent =
      formatPhoneNumber(cleanPhone);
    document.getElementById("customerEmail").textContent = formData.email;

    // Show modal
    bookingModal.style.display = "block";
    document.body.style.overflow = "hidden";

    // Reset form
    setTimeout(() => {
      bookingForm.reset();
    }, 300);

    console.log("Booking submitted:", formData);
  });
}

// Function to show form error
function showFormError(message) {
  const existingError = document.querySelector(".form-error");
  if (existingError) existingError.remove();

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

  bookingForm.insertBefore(errorDiv, bookingForm.firstChild);
  errorDiv.scrollIntoView({ behavior: "smooth", block: "center" });

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
  document.body.style.overflow = "auto";
}

// Event listeners for modal close buttons
if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
if (modalCloseX) modalCloseX.addEventListener("click", closeModal);
if (newBookingBtn)
  newBookingBtn.addEventListener("click", () => {
    closeModal();
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

// Vercel Router - Updated Version
class VercelRouter {
  constructor() {
    this.routes = {
      "/": "home",
      "/home": "home",
      "/about": "about",
      "/services": "services",
      "/booking": "booking",
      "/faq": "faq",
      "/privacy-policy": "privacy",
      "/terms-conditions": "terms",
    };

    this.pageTitles = {
      home: "Home - ZOLVEX | Ready to Revive",
      about: "About Us - ZOLVEX | Ready to Revive",
      services: "Services - ZOLVEX | Ready to Revive",
      booking: "Book a Service - ZOLVEX | Ready to Revive",
      faq: "FAQ - ZOLVEX | Ready to Revive",
      privacy: "Privacy Policy - ZOLVEX | Ready to Revive",
      terms: "Terms & Conditions - ZOLVEX | Ready to Revive",
    };

    this.init();
  }

  init() {
    // Handle initial page load
    this.handleRoute(window.location.pathname);

    // Handle browser back/forward
    window.addEventListener("popstate", () => {
      this.handleRoute(window.location.pathname);
    });

    // Handle all link clicks
    document.addEventListener("click", (e) => {
      // Check if it's a regular link
      if (
        e.target.matches('a[href^="/"]') &&
        !e.target.matches('a[href^="http"]') &&
        !e.target.matches("a[download]")
      ) {
        e.preventDefault();
        const path = e.target.getAttribute("href");
        this.navigate(path, true);
      }

      // Also handle data-page links
      const dataPageLink = e.target.closest("[data-page]");
      if (dataPageLink && dataPageLink.hasAttribute("data-page")) {
        e.preventDefault();
        const pageId = dataPageLink.getAttribute("data-page");
        this.navigateByPageId(pageId, true);
      }
    });
  }

  navigate(path, updateHistory = true) {
    // Clean the path
    if (path === "" || path === "/index.html") path = "/";

    // Get page ID from route
    const pageId = this.routes[path] || "home";

    // Show the page
    this.showPage(pageId);

    // Update URL if needed
    if (updateHistory && path !== window.location.pathname) {
      history.pushState({ pageId }, "", path);
    }

    // Update active navigation
    this.updateActiveNav(pageId);

    // Scroll to top
    window.scrollTo(0, 0);

    // Update page title
    this.updatePageTitle(pageId);
  }

  navigateByPageId(pageId, updateHistory = true) {
    // Find path for page ID
    const path =
      Object.keys(this.routes).find((key) => this.routes[key] === pageId) || "/";
    this.navigate(path, updateHistory);
  }

  handleRoute(path) {
    this.navigate(path, false);
  }

  showPage(pageId) {
    // Hide all pages
    document.querySelectorAll(".page-content").forEach((page) => {
      page.classList.remove("active");
    });

    // Show requested page
    const page = document.getElementById(pageId);
    if (page) {
      page.classList.add("active");

      // Special handling for booking form
      if (pageId === "booking") {
        const dateInput = document.getElementById("preferredDate");
        if (dateInput) {
          const today = new Date().toISOString().split("T")[0];
          dateInput.min = today;
        }
      }
    }
  }

  updateActiveNav(pageId) {
    // Remove active from all nav links
    document.querySelectorAll("nav a").forEach((link) => {
      link.classList.remove("active");
    });

    // Add active to current page link
    const activeNavLink = document.querySelector(`nav a[data-page="${pageId}"]`);
    if (activeNavLink) {
      activeNavLink.classList.add("active");
    }

    // Also update footer links if they exist
    const path = Object.keys(this.routes).find(
      (key) => this.routes[key] === pageId
    );
    if (path) {
      const footerLinks = document.querySelectorAll(
        `footer a[href="${path}"]`
      );
      footerLinks.forEach((link) => {
        link.classList.add("active");
      });
    }
  }

  updatePageTitle(pageId) {
    document.title = this.pageTitles[pageId] || "ZOLVEX | Ready to Revive";
  }
}

// Initialize router
const router = new VercelRouter();