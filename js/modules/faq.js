// FAQ Data Structure
const FAQ_DATA = {
    "General": {
        icon: "fas fa-question-circle",
        questions: [
            {
                question: "Will you arrive on the exact date and time booked?",
                answer: "Yes. Once a booking is confirmed, our team will arrive as scheduled. In rare and unavoidable situations, if any delay or change occurs, we will inform you in advance."
            },
            {
                question: "Do we need to be at home during the service?",
                answer: "It is not mandatory for customers to stay at home. However, if access, electricity, water supply, or instructions are required during the service, someone should be available."
            },
            {
                question: "Do we need to prepare anything before the service?",
                answer: "No major preparation is required. If certain areas are cleared in advance, it can help the team work faster, but our staff can manage even if everything is not prepared."
            },
            {
                question: "Will you bring all cleaning materials and equipment?",
                answer: "Yes. Our team brings all required tools, equipment, and cleaning materials needed for the service."
            },
            {
                question: "Are the cleaning methods safe?",
                answer: "Yes. We follow safe cleaning practices and avoid harsh or damaging methods. Customer health, safety, and property protection are our top priorities."
            },
            {
                question: "How long does a service usually take?",
                answer: "The time required depends on the type of service, size of the area, and condition. Our team will give you an estimated duration before starting the work."
            },
            {
                question: "Will the entire service be completed in one day?",
                answer: "Yes, in most cases the service is completed in a single day. For larger spaces or detailed services, the duration may vary and will be informed in advance."
            },
            {
                question: "How many staff members will come for the service?",
                answer: "The number of staff depends on the service type and size of the job. Adequate manpower will be assigned to ensure efficient and timely completion."
            },
            {
                question: "What if there are any missed spots after cleaning?",
                answer: "Customer satisfaction is important to us. If you notice any missed areas immediately after the service, please inform us and our team will address it."
            },
            {
                question: "Do you handle waste disposal after cleaning?",
                answer: "Basic cleaning waste will be collected and kept aside. Final disposal can be done as per customer guidance or local disposal facilities."
            },
            {
                question: "Can you clean specific areas or handle special requests?",
                answer: "Yes. If you have any specific areas or special instructions, please inform us before or during the service, and our team will try to accommodate them."
            },
            {
                question: "What services does Zolvex provide?",
                answer: "We offer professional home and property cleaning services, including deep cleaning, water tank cleaning, and other specialised cleaning solutions."
            }
        ]
    },
    "Water Tank": {
        icon: "fas fa-water",
        questions: [
            {
                question: "Do you use acid or chemicals to clean the tank?",
                answer: "No. We do not use acid or harsh chemicals for cleaning. Our process focuses on safe cleaning methods that remove dirt and sludge without damaging the tank or affecting water quality."
            },
            {
                question: "How long does water tank cleaning usually take?",
                answer: "The cleaning time depends on the size and condition of the tank. In most cases, the process takes around 1 to 1.5 hours per tank."
            },
            {
                question: "Is it necessary for someone to be at home during the service?",
                answer: "It is not compulsory for customers to be present throughout the service. However, access to electricity, water supply, or motor controls may be required, so someone should be available if needed."
            },
            {
                question: "What happens if there is water already inside the tank?",
                answer: "That is not an issue. Our team will safely remove the existing water before cleaning and proceed with the service as planned."
            },
            {
                question: "What type of cleaning liquid is used?",
                answer: "We use safe and suitable cleaning liquids designed for water tank cleaning. We avoid harmful substances to ensure health safety and water hygiene."
            },
            {
                question: "Do customers need to prepare anything in advance?",
                answer: "No major preparation is required. If the tank is emptied beforehand, it may help speed up the process, but the service can be completed even if the tank is not pre-emptied."
            },
            {
                question: "If I empty the tank in advance, will the service still be carried out?",
                answer: "Yes. Once a booking is confirmed, our team will arrive as scheduled and carry out the service accordingly."
            },
            {
                question: "Will you clean the outer surface of the water tank?",
                answer: "Yes. Basic outer surface cleaning is included as part of the service."
            },
            {
                question: "Do you provide well cleaning services?",
                answer: "No. At present, we do not offer well cleaning services."
            }
        ]
    },
    "House Cleaning": {
        icon: "fas fa-home",
        questions: [
            {
                question: "Will you arrive on the exact date booked?",
                answer: "Yes. Once the booking is confirmed, our team will arrive on the scheduled date and time. If there are any unexpected changes, customers will be informed in advance."
            },
            {
                question: "Do we need to be at home during the cleaning?",
                answer: "It is not mandatory to stay at home during the entire service. However, if access, instructions, or approvals are required, someone should be available."
            },
            {
                question: "Should we prepare anything before the cleaning starts?",
                answer: "No major preparation is required. If personal items are cleared in advance, it can help the team work faster, but our staff can manage even if this is not done."
            },
            {
                question: "Do you handle waste disposal after cleaning?",
                answer: "Basic cleaning waste will be collected and kept aside. Final disposal can be done as per customer preference or local disposal arrangements."
            },
            {
                question: "Should we remove items from cupboards, or will you handle that?",
                answer: "You may remove personal items if you prefer. If required, our team can take out items, clean the area, and place them back carefully."
            },
            {
                question: "If any spots are missed, will you come back and clean them?",
                answer: "Customer satisfaction is important to us. If you notice any missed areas, please inform our team before they leave the premises, and the issue will be addressed immediately."
            },
            {
                question: "What cleaning services do you offer?",
                answer: "We provide professional house cleaning services, including general cleaning, deep cleaning, and other customised cleaning solutions."
            },
            {
                question: "How often should deep cleaning be done?",
                answer: "Deep cleaning is recommended once every 3 to 6 months, depending on usage and household requirements."
            },
            {
                question: "How long does house cleaning take?",
                answer: "The duration depends on the size of the house, service type, and level of cleaning required. An estimated time will be shared before the service begins."
            },
            {
                question: "Can you clean specific areas separately?",
                answer: "Yes. If you need specific rooms or areas cleaned, please inform us in advance so we can plan accordingly."
            },
            {
                question: "Can you rearrange items while cleaning if required?",
                answer: "Yes. If rearrangement is needed during cleaning, our team can assist within reasonable limits."
            },
            {
                question: "Will the entire cleaning be completed in one day?",
                answer: "Yes, most house cleaning services are completed within a single day. For larger homes or detailed services, timelines will be discussed in advance."
            },
            {
                question: "How many staff members will come for the cleaning?",
                answer: "The number of staff depends on the size of the house and type of service. Adequate manpower will be assigned to ensure efficient completion."
            }
        ]
    },
    "Sofa Cleaning": {
        icon: "fas fa-couch",
        questions: [
            {
                question: "What types of sofas do you clean?",
                answer: "We clean fabric sofas, leather sofas, recliners, and cushioned seating, depending on material condition and accessibility."
            },
            {
                question: "Do you use water or dry cleaning methods?",
                answer: "The cleaning method depends on the sofa material and level of dirt. Our team will choose the most suitable and safe method after inspection."
            },
            {
                question: "Are the cleaning solutions safe?",
                answer: "Yes. We use safe and non-harmful cleaning solutions suitable for upholstery. Harsh chemicals that may damage fabric or affect health are avoided."
            },
            {
                question: "Will sofa cleaning damage the fabric or colour?",
                answer: "No. Our cleaning process is material-specific and done carefully to avoid colour fading or fabric damage."
            },
            {
                question: "How long does sofa cleaning take?",
                answer: "Sofa cleaning usually takes 1 to 2 hours, depending on the size and condition of the sofa."
            },
            {
                question: "How long does it take for the sofa to dry?",
                answer: "Drying time depends on the cleaning method, fabric type, and ventilation. On average, sofas dry within 2 to 3 hours."
            },
            {
                question: "Will you remove stains and odour completely?",
                answer: "Most common stains and odours can be significantly reduced or removed. However, complete removal depends on stain type and how long it has been present."
            },
            {
                question: "Will you clean cushions separately?",
                answer: "Yes. Cushions will be cleaned separately where required for better results."
            }
        ]
    }
};

export class FAQManager {
    constructor() {
        this.currentCategory = 'General';
        this.allQuestions = this.getAllQuestions();
        this.searchTimeout = null;
        this.searchTerm = '';
        
        // DOM Elements
        this.elements = {
            categoriesList: document.getElementById('categoriesList'),
            mobileCategorySelect: document.getElementById('mobileCategorySelect'),
            faqItemsContainer: document.getElementById('faqItemsContainer'),
            currentCategoryTitle: document.getElementById('currentCategoryTitle'),
            faqCount: document.getElementById('faqCount'),
            faqEmpty: document.getElementById('faqEmpty'),
            faqSearch: document.getElementById('faqSearch'),
            clearSearch: document.getElementById('clearSearch'),
            searchResults: document.getElementById('searchResults')
        };
    }

    init() {
        if (!this.elements.categoriesList) return;
        
        this.renderCategories();
        this.renderCategoryQuestions();
        this.setupEventListeners();
        this.setupSearch();
        
        console.log('FAQ Manager initialized with categories');
    }

    // Get all questions from all categories
    getAllQuestions() {
        const allQuestions = [];
        Object.keys(FAQ_DATA).forEach(category => {
            FAQ_DATA[category].questions.forEach(q => {
                allQuestions.push({
                    ...q,
                    category: category,
                    categoryIcon: FAQ_DATA[category].icon
                });
            });
        });
        return allQuestions;
    }

    // Render categories in sidebar
    renderCategories() {
        const categories = Object.keys(FAQ_DATA);
        
        // Clear existing
        this.elements.categoriesList.innerHTML = '';
        
        // Create category items
        categories.forEach(category => {
            const count = FAQ_DATA[category].questions.length;
            
            // Category item for sidebar
            const categoryItem = document.createElement('div');
            categoryItem.className = `category-item ${category === this.currentCategory ? 'active' : ''}`;
            categoryItem.dataset.category = category;
            
            categoryItem.innerHTML = `
                <div class="category-name">
                    <div class="category-icon">
                        <i class="${FAQ_DATA[category].icon}"></i>
                    </div>
                    <span>${category}</span>
                </div>
                <div class="category-count">${count}</div>
            `;
            
            this.elements.categoriesList.appendChild(categoryItem);
            
            // Option for mobile dropdown
            const option = document.createElement('option');
            option.value = category;
            option.textContent = `${category} (${count})`;
            this.elements.mobileCategorySelect.appendChild(option);
        });
        
        // Set mobile select value
        this.elements.mobileCategorySelect.value = this.currentCategory;
    }

    // Render questions for current category
    renderCategoryQuestions(filteredQuestions = null) {
        const questions = filteredQuestions || FAQ_DATA[this.currentCategory].questions;
        
        // Clear existing
        this.elements.faqItemsContainer.innerHTML = '';
        
        // Update header
        this.elements.currentCategoryTitle.textContent = this.currentCategory;
        this.elements.faqCount.textContent = `${questions.length} Question${questions.length !== 1 ? 's' : ''}`;
        
        // Show/hide empty state
        if (questions.length === 0) {
            this.elements.faqEmpty.classList.add('active');
            return;
        } else {
            this.elements.faqEmpty.classList.remove('active');
        }
        
        // Create question items
        questions.forEach((q, index) => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item-new';
            faqItem.id = `faq-${this.currentCategory.toLowerCase().replace(/\s+/g, '-')}-${index}`;
            
            faqItem.innerHTML = `
                <div class="faq-question-new">
                    <div class="faq-question-content">
                        <div class="faq-question-icon">
                            <i class="fas fa-question-circle"></i>
                        </div>
                        <div class="faq-question-text">${q.question}</div>
                    </div>
                    <div class="faq-toggle">
                        <i class="fas fa-chevron-down"></i>
                    </div>
                </div>
                <div class="faq-answer-new">
                    <div class="faq-answer-content">
                        <div class="faq-answer-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="faq-answer-text">${q.answer}</div>
                    </div>
                </div>
            `;
            
            this.elements.faqItemsContainer.appendChild(faqItem);
        });
        
        // Re-attach event listeners to new FAQ items
        this.attachFAQEventListeners();
    }

    // Switch category
    switchCategory(category) {
        if (!FAQ_DATA[category]) return;
        
        // Update current category
        this.currentCategory = category;
        
        // Update active category in sidebar
        document.querySelectorAll('.category-item').forEach(item => {
            if (item.dataset.category === category) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Update mobile select
        this.elements.mobileCategorySelect.value = category;
        
        // Clear search if active
        if (this.searchTerm) {
            this.clearSearchHandler();
        }
        
        // Render questions for new category
        this.renderCategoryQuestions();
        
        // Scroll to top of questions
        this.elements.faqItemsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Search functionality
    setupSearch() {
        if (!this.elements.faqSearch) return;
        
        // Search input handler with debounce
        this.elements.faqSearch.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.trim();
            
            // Show/hide clear button
            if (this.searchTerm) {
                this.elements.clearSearch.classList.add('active');
            } else {
                this.elements.clearSearch.classList.remove('active');
                this.elements.searchResults.classList.remove('active');
                this.renderCategoryQuestions(); // Show all questions for current category
                return;
            }
            
            // Clear previous timeout
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }
            
            // Set new timeout for debounce
            this.searchTimeout = setTimeout(() => {
                this.performSearch(this.searchTerm);
            }, 300);
        });
        
        // Clear search button
        this.elements.clearSearch.addEventListener('click', () => {
            this.clearSearchHandler();
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.elements.searchResults.contains(e.target) && 
                !this.elements.faqSearch.contains(e.target)) {
                this.elements.searchResults.classList.remove('active');
            }
        });
    }

    performSearch(searchTerm) {
        const term = searchTerm.toLowerCase();
        
        // Search in current category only
        const currentCategoryQuestions = FAQ_DATA[this.currentCategory].questions
            .filter(q => 
                q.question.toLowerCase().includes(term) || 
                q.answer.toLowerCase().includes(term)
            );
        
        // Search across all questions for search results dropdown
        const allResults = this.allQuestions.filter(q => 
            q.question.toLowerCase().includes(term) || 
            q.answer.toLowerCase().includes(term)
        );
        
        // Render filtered questions for current category
        this.renderCategoryQuestions(currentCategoryQuestions);
        
        // Show search results dropdown
        this.showSearchResults(allResults, term);
    }

    showSearchResults(results, searchTerm) {
        if (results.length === 0 || !searchTerm) {
            this.elements.searchResults.classList.remove('active');
            return;
        }
        
        // Clear previous results
        this.elements.searchResults.innerHTML = '';
        
        // Add results (limited to 8 for performance)
        results.slice(0, 8).forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <div class="search-result-category">${result.category}</div>
                <div class="search-result-question">${this.highlightText(result.question, searchTerm)}</div>
            `;
            
            // Click handler to switch to that question
            resultItem.addEventListener('click', () => {
                this.switchCategory(result.category);
                
                // Find and open the specific question
                setTimeout(() => {
                    const questions = FAQ_DATA[result.category].questions;
                    const index = questions.findIndex(q => q.question === result.question);
                    if (index !== -1) {
                        this.openSpecificQuestion(result.category, index);
                    }
                    
                    // Clear search
                    this.clearSearchHandler();
                }, 100);
            });
            
            this.elements.searchResults.appendChild(resultItem);
        });
        
        this.elements.searchResults.classList.add('active');
    }

    highlightText(text, searchTerm) {
        if (!searchTerm) return text;
        
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    clearSearchHandler() {
        this.elements.faqSearch.value = '';
        this.searchTerm = '';
        this.elements.clearSearch.classList.remove('active');
        this.elements.searchResults.classList.remove('active');
        this.renderCategoryQuestions();
    }

    // Open specific question by index
    openSpecificQuestion(category, questionIndex) {
        // Close all open FAQs first
        document.querySelectorAll('.faq-item-new.active').forEach(item => {
            item.classList.remove('active');
            const answer = item.querySelector('.faq-answer-new');
            answer.style.maxHeight = '0';
        });
        
        // Find and open the specific FAQ
        const faqId = `faq-${category.toLowerCase().replace(/\s+/g, '-')}-${questionIndex}`;
        const faqItem = document.getElementById(faqId);
        
        if (faqItem) {
            faqItem.classList.add('active');
            const answer = faqItem.querySelector('.faq-answer-new');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            
            // Scroll to the question
            faqItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Event listeners
    setupEventListeners() {
        // Category click in sidebar
        document.querySelectorAll('.category-item').forEach(item => {
            item.addEventListener('click', () => {
                const category = item.dataset.category;
                this.switchCategory(category);
            });
        });
        
        // Mobile category select
        this.elements.mobileCategorySelect.addEventListener('change', (e) => {
            this.switchCategory(e.target.value);
        });
        
        // Keyboard navigation for categories
        this.elements.categoriesList.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const categoryItem = e.target.closest('.category-item');
                if (categoryItem) {
                    e.preventDefault();
                    this.switchCategory(categoryItem.dataset.category);
                }
            }
        });
        
        // Listen for page changes to reset FAQ
        document.addEventListener('pagechanged', (e) => {
            if (e.detail.pageId === 'faq') {
                // Reset to first category if needed
                if (this.currentCategory !== 'General') {
                    this.switchCategory('General');
                }
                
                // Clear search
                this.clearSearchHandler();
            }
        });
    }

    // Attach event listeners to FAQ items
    attachFAQEventListeners() {
        document.querySelectorAll('.faq-question-new').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const answer = faqItem.querySelector('.faq-answer-new');
                
                // Toggle active class
                const isOpening = !faqItem.classList.contains('active');
                
                // Close other FAQs if this one is opening
                if (isOpening) {
                    document.querySelectorAll('.faq-item-new.active').forEach(item => {
                        if (item !== faqItem) {
                            item.classList.remove('active');
                            const otherAnswer = item.querySelector('.faq-answer-new');
                            otherAnswer.style.maxHeight = '0';
                        }
                    });
                }
                
                // Toggle current FAQ
                faqItem.classList.toggle('active');
                
                if (faqItem.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '0';
                }
            });
            
            // Keyboard support
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        });
    }

    // Get all FAQ data (for external use)
    getAllFAQData() {
        return FAQ_DATA;
    }

    // Get questions by category
    getQuestionsByCategory(category) {
        return FAQ_DATA[category] ? FAQ_DATA[category].questions : [];
    }

    // Add a new question (for admin use)
    addQuestion(category, question, answer) {
        if (!FAQ_DATA[category]) {
            FAQ_DATA[category] = {
                icon: 'fas fa-question-circle',
                questions: []
            };
        }
        
        FAQ_DATA[category].questions.push({ question, answer });
        this.allQuestions = this.getAllQuestions();
        
        // Update UI if this is the current category
        if (category === this.currentCategory) {
            this.renderCategoryQuestions();
            this.renderCategories();
        }
        
        return true;
    }
}