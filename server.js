
// DOM elements
const tabs = document.querySelectorAll('.tab');
const formSections = document.querySelectorAll('.form-section');
const nextButtons = document.querySelectorAll('.btn-next');
const prevButtons = document.querySelectorAll('.btn-prev');
const submitBtn = document.getElementById('submitBtn');
const viewDashboardBtn = document.getElementById('viewDashboard');
const successMessage = document.getElementById('success-message');
const progressBar = document.getElementById('progress-bar');
const housingStatus = document.getElementById('housingStatus');
const rentSection = document.getElementById('rentSection');
const previewContent = document.getElementById('preview-content');
const reviewContent = document.getElementById('review-content');
const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const healthMeter = document.getElementById('health-meter');
const healthPercentage = document.getElementById('health-percentage');
const financialSummary = document.getElementById('financial-summary');
const saveNotification = document.getElementById('saveNotification');
const deleteNotification = document.getElementById('deleteNotification');
const aiNotification = document.getElementById('aiNotification');
const generatePasswordBtn = document.getElementById('generatePasswordBtn');
const generatedPasswordInput = document.getElementById('generatedPassword');
const saveAccountBtn = document.getElementById('saveAccountBtn');
const saveIncomeBtn = document.getElementById('saveIncomeBtn');
const saveExpensesBtn = document.getElementById('saveExpensesBtn');
const saveReviewBtn = document.getElementById('saveReviewBtn');
const goalCards = document.querySelectorAll('.goal-card');
const saveGoalsBtn = document.getElementById('saveGoalsBtn');
const specificGoal = document.getElementById('specific-goal');
const deleteAccountBtn = document.getElementById('deleteAccountBtn');
const dashboardContainer = document.getElementById('dashboardContainer');
const container = document.querySelector('.container');
const backToFormBtn = document.getElementById('backToForm');
const generateRecommendationsBtn = document.getElementById('generateRecommendations');
const aiLoading = document.getElementById('aiLoading');
const recommendationsList = document.getElementById('recommendationsList');
const countrySelect = document.getElementById('country');
const currencySymbols = document.querySelectorAll('.currency-symbol');
const countryRecommendationsContent = document.getElementById('country-recommendations-content');
const dashboardNavLinks = document.querySelectorAll('.persistent-nav a');
const dashboardSections = document.querySelectorAll('.dashboard-section');

// Currency map with all countries
const currencyMap = {
    'US': '$',
    'UK': '£',
    'CA': '$',
    'AU': '$',
    'IN': '₹',
    'DE': '€',
    'FR': '€',
    'JP': '¥',
    'CN': '¥',
    'BR': 'R$',
    'ZA': 'R',
    'RU': '₽',
    'MX': '$',
    'ES': '€',
    'IT': '€',
    'NL': '€',
    'SE': 'kr',
    'CH': 'CHF',
    'SG': 'S$',
    'KR': '₩',
    'AE': 'د.إ',
    'SA': '﷼',
    'TR': '₺',
    'ID': 'Rp',
    'TH': '฿',
    'AR': '$',
    'CL': '$',
    'CO': '$',
    'EG': '£',
    'NG': '₦',
    'KE': 'KSh',
    'MY': 'RM',
    'PH': '₱',
    'VN': '₫',
    'BD': '৳',
    'PK': '₨',
    'PL': 'zł',
    'HU': 'Ft',
    'RO': 'lei',
    'CZ': 'Kč',
    'GR': '€',
    'PT': '€',
    'BE': '€',
    'AT': '€',
    'DK': 'kr',
    'NO': 'kr',
    'FI': '€',
    'IL': '₪',
    'NZ': '$',
    'CR': '₡',
    'DO': '$',
    'EC': '$',
    'GT': 'Q',
    'HN': 'L',
    'JM': 'J$',
    'PA': 'B/.',
    'PE': 'S/',
    'PR': '$',
    'UY': '$U',
    'VE': 'Bs',
    'GH': '₵',
    'MA': 'د.م.',
    'TZ': 'TSh',
    'UG': 'USh',
    'BH': '.د.ب',
    'IQ': 'ع.د',
    'JO': 'د.ا',
    'KW': 'د.ك',
    'LB': 'ل.ل',
    'OM': 'ر.ع.',
    'QA': 'ر.ق',
    'LK': 'රු',
    'NP': '₨',
    'MM': 'K',
    'KH': '៛',
    'LA': '₭',
    'MN': '₮',
    'BT': 'Nu.',
    'MV': 'ރ'
};

// Current active section
let currentSection = 'account';
let selectedGoal = 'debt-reduction';
let currentCurrency = '$';

// Toggle password visibility
togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

toggleConfirmPassword.addEventListener('click', function() {
    const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
    this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

// Update housing section based on selection
housingStatus.addEventListener('change', () => {
    if (housingStatus.value === 'rent') {
        rentSection.style.display = 'block';
    } else {
        rentSection.style.display = 'none';
        document.getElementById('monthlyRent').value = '';
    }
    updatePreview();
});

// Goal card selection
goalCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove selected class from all cards
        goalCards.forEach(c => c.classList.remove('selected'));
        
        // Add selected class to clicked card
        card.classList.add('selected');
        
        // Store the selected goal
        selectedGoal = card.getAttribute('data-goal');
        
        // Update preview
        updatePreview();
    });
});

// Tab switching
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        switchSection(tabId);
    });
});

// Next button functionality
nextButtons.forEach(button => {
    button.addEventListener('click', () => {
        const nextSection = button.getAttribute('data-next');
        if (validateSection(currentSection)) {
            switchSection(nextSection);
        }
    });
});

// Previous button functionality
prevButtons.forEach(button => {
    button.addEventListener('click', () => {
        const prevSection = button.getAttribute('data-prev');
        switchSection(prevSection);
    });
});

// Password strength validation
function validatePassword(password) {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    // Update requirement indicators
    updateRequirement('req-length', hasMinLength);
    updateRequirement('req-upper', hasUpperCase);
    updateRequirement('req-lower', hasLowerCase);
    updateRequirement('req-number', hasNumber);
    updateRequirement('req-special', hasSpecialChar);
    
    return hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
}

// Helper function to update password requirements
function updateRequirement(id, isMet) {
    const element = document.getElementById(id);
    element.className = isMet ? 'requirement-met' : 'requirement-not-met';
    element.innerHTML = isMet ? 
        '<i class="fas fa-check-circle"></i> ' + element.textContent : 
        '<i class="fas fa-times-circle"></i> ' + element.textContent;
}

// Password generator function
function generatePassword() {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    
    // Ensure at least one of each required character type
    password += getRandomChar("ABCDEFGHIJKLMNOPQRSTUVWXYZ"); // uppercase
    password += getRandomChar("abcdefghijklmnopqrstuvwxyz"); // lowercase
    password += getRandomChar("0123456789"); // number
    password += getRandomChar("!@#$%^&*()_+~`|}{[]:;?><,./-="); // special
    
    // Fill the rest of the password
    for (let i = password.length; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    // Shuffle the password
    return password.split('').sort(() => 0.5 - Math.random()).join('');
}

function getRandomChar(chars) {
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

// Generate password button
generatePasswordBtn.addEventListener('click', () => {
    const newPassword = generatePassword();
    generatedPasswordInput.value = newPassword;
    passwordInput.value = newPassword;
    confirmPasswordInput.value = newPassword;
    validatePassword(newPassword);
});

// Real-time password validation
passwordInput.addEventListener('input', () => {
    validatePassword(passwordInput.value);
});

// Form validation by section
function validateSection(section) {
    let isValid = true;
    
    // Hide all errors first
    document.querySelectorAll('.validation-error').forEach(el => {
        el.style.display = 'none';
    });
    
    switch(section) {
        case 'account':
            if (!document.getElementById('fullName').value.trim()) {
                document.getElementById('name-error').style.display = 'block';
                isValid = false;
            }
            
            const email = document.getElementById('email').value;
            if (!email || !validateEmail(email)) {
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            }
            
            if (!document.getElementById('country').value) {
                document.getElementById('country-error').style.display = 'block';
                isValid = false;
            }
            
            const password = document.getElementById('password').value;
            if (!validatePassword(password)) {
                document.getElementById('password-error').style.display = 'block';
                isValid = false;
            }
            
            const confirmPassword = document.getElementById('confirmPassword').value;
            if (password !== confirmPassword) {
                document.getElementById('confirm-error').style.display = 'block';
                isValid = false;
            }
            break;
            
        case 'income':
            if (!document.getElementById('employmentStatus').value) {
                document.getElementById('employment-error').style.display = 'block';
                isValid = false;
            }
            
            if (!document.getElementById('salary').value || 
                parseFloat(document.getElementById('salary').value) <= 0) {
                document.getElementById('salary-error').style.display = 'block';
                isValid = false;
            }
            break;
            
        case 'expenses':
            if (!document.getElementById('housingStatus').value) {
                document.getElementById('housing-error').style.display = 'block';
                isValid = false;
            }
            
            if (housingStatus.value === 'rent' && 
                (!document.getElementById('monthlyRent').value || 
                parseFloat(document.getElementById('monthlyRent').value) <= 0)) {
                document.getElementById('rent-error').style.display = 'block';
                isValid = false;
            }
            
            if (!document.getElementById('utilities').value || 
                parseFloat(document.getElementById('utilities').value) < 0) {
                document.getElementById('utilities-error').style.display = 'block';
                isValid = false;
            }
            
            if (!document.getElementById('groceries').value || 
                parseFloat(document.getElementById('groceries').value) <= 0) {
                document.getElementById('groceries-error').style.display = 'block';
                isValid = false;
            }
            
            if (!document.getElementById('transportation').value || 
                parseFloat(document.getElementById('transportation').value) < 0) {
                document.getElementById('transport-error').style.display = 'block';
                isValid = false;
            }
            break;
            
        case 'goals':
            if (!selectedGoal) {
                // Show error message
                const goalsError = document.createElement('div');
                goalsError.className = 'validation-error';
                goalsError.textContent = 'Please select your financial goal';
                goalsError.style.display = 'block';
                goalsError.id = 'goals-error';
                
                // Remove existing error if any
                const existingError = document.getElementById('goals-error');
                if (existingError) existingError.remove();
                
                // Insert after goal cards
                const goalCardsContainer = document.querySelector('.goal-cards');
                goalCardsContainer.after(goalsError);
                
                isValid = false;
            }
            break;
            
        case 'review':
            if (!document.getElementById('agreement').checked) {
                const agreementError = document.createElement('div');
                agreementError.className = 'validation-error';
                agreementError.textContent = 'Please agree to the terms and privacy policy';
                agreementError.style.display = 'block';
                agreementError.id = 'agreement-error';
                
                // Remove existing error if any
                const existingError = document.getElementById('agreement-error');
                if (existingError) existingError.remove();
                
                // Insert after agreement checkbox
                const agreementContainer = document.querySelector('.groupie');
                agreementContainer.after(agreementError);
                
                isValid = false;
            }
            break;
    }
    
    return isValid;
}

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Switch between form sections
function switchSection(sectionId) {
    // Update tabs
    tabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === sectionId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Update form sections
    formSections.forEach(section => {
        if (section.id === `${sectionId}-section`) {
            section.classList.add('active');
            currentSection = sectionId;
        } else {
            section.classList.remove('active');
        }
    });
    
    // Update progress bar
    const sections = ['account', 'income', 'expenses', 'goals', 'review'];
    const progress = (sections.indexOf(sectionId) + 1) / sections.length * 100;
    progressBar.style.width = `${progress}%`;
    
    // Update preview content
    updatePreview();
}

// Update preview content
function updatePreview() {
    // Get form values
    const fullName = document.getElementById('fullName').value || 'Not provided';
    const email = document.getElementById('email').value || 'Not provided';
    const country = document.getElementById('country').options[document.getElementById('country').selectedIndex].text || 'Not provided';
    const employmentStatus = document.getElementById('employmentStatus').options[document.getElementById('employmentStatus').selectedIndex].text || 'Not provided';
    const salary = document.getElementById('salary').value || '0';
    const otherIncome = document.getElementById('otherIncome').value || '0';
    const housingStatusValue = document.getElementById('housingStatus').options[document.getElementById('housingStatus').selectedIndex].text || 'Not provided';
    const monthlyRent = document.getElementById('monthlyRent').value || '0';
    const utilities = document.getElementById('utilities').value || '0';
    const groceries = document.getElementById('groceries').value || '0';
    const transportation = document.getElementById('transportation').value || '0';
    
    // Format the goal
    let goalText = 'Not selected';
    if (selectedGoal) {
        const goalMap = {
            'increase-income': 'Increase Income',
            'budget-management': 'Budget Management',
            'debt-reduction': 'Debt Reduction',
            'savings-goal': 'Savings Goal',
            'investment-strategy': 'Investment Strategy',
            'retirement-planning': 'Retirement Planning'
        };
        goalText = goalMap[selectedGoal] || selectedGoal;
    }
    
    // Calculate total income
    const totalIncome = parseFloat(salary) + parseFloat(otherIncome);
    
    // Calculate total expenses
    const totalExpenses = parseFloat(monthlyRent) + parseFloat(utilities) + 
                            parseFloat(groceries) + parseFloat(transportation);
    
    // Calculate net income
    const netIncome = totalIncome - totalExpenses;
    
    // Calculate financial health percentage
    let healthPercentageValue = 50; // Default to medium
    if (totalIncome > 0) {
        const expenseRatio = (totalExpenses / totalIncome) * 100;
        healthPercentageValue = 100 - Math.min(expenseRatio, 100);
        
        // Cap at 100%
        healthPercentageValue = Math.min(healthPercentageValue, 100);
    }
    healthMeter.style.width = `${healthPercentageValue}%`;
    document.getElementById('health-percentage').textContent = Math.round(healthPercentageValue) + '%';
    
    // Update preview content
    previewContent.innerHTML = `
        <div class="preview-item">
            <div class="preview-label"><i class="fas fa-user"></i> Account Information</div>
            <div class="preview-value">${fullName}<br>${email}<br>${country}</div>
        </div>
        <div class="preview-item">
            <div class="preview-label"><i class="fas fa-bullseye"></i> Financial Goal</div>
            <div class="preview-value">${goalText}</div>
        </div>
        <div class="preview-item">
            <div class="preview-label"><i class="fas fa-briefcase"></i> Employment Status</div>
            <div class="preview-value">${employmentStatus}</div>
        </div>
        <div class="preview-item">
            <div class="preview-label"><i class="fas fa-money-bill-wave"></i> Monthly Income</div>
            <div class="preview-value">${currentCurrency}${parseFloat(totalIncome).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
        </div>
        <div class="preview-item">
            <div class="preview-label"><i class="fas fa-home"></i> Housing Situation</div>
            <div class="preview-value">${housingStatusValue}</div>
        </div>
        <div class="preview-item">
            <div class="preview-label"><i class="fas fa-chart-pie"></i> Monthly Expenses</div>
            <div class="preview-value">${currentCurrency}${parseFloat(totalExpenses).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
        </div>
        <div class="preview-item">
            <div class="preview-label"><i class="fas fa-balance-scale"></i> Net Monthly Income</div>
            <div class="preview-value" style="color: ${netIncome >= 0 ? '#2ecc71' : '#e74c3c'}">
                ${currentCurrency}${Math.abs(netIncome).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} 
                ${netIncome >= 0 ? '<i class="fas fa-arrow-up"></i> surplus' : '<i class="fas fa-arrow-down"></i> deficit'}
            </div>
        </div>
    `;
    
    // Update review content
    reviewContent.innerHTML = previewContent.innerHTML;
    
    // Update financial summary
    financialSummary.innerHTML = `
        <p>Total Monthly Income: <strong>${currentCurrency}${parseFloat(totalIncome).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong></p>
        <p>Total Monthly Expenses: <strong>${currentCurrency}${parseFloat(totalExpenses).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong></p>
        <p style="font-size: 1.2rem;">Net Monthly: 
            <strong style="color: ${netIncome >= 0 ? '#27ae60' : '#e74c3c'}">
                ${currentCurrency}${parseFloat(netIncome).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </strong>
        </p>
        <p style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;">
            Financial Goal: <strong>${goalText}</strong>
        </p>
    `;
}

// Save form data to localStorage
function saveFormData() {
    const formData = {
        account: {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            country: document.getElementById('country').value,
            password: document.getElementById('password').value
        },
        income: {
            employmentStatus: document.getElementById('employmentStatus').value,
            salary: document.getElementById('salary').value,
            otherIncome: document.getElementById('otherIncome').value
        },
        expenses: {
            housingStatus: document.getElementById('housingStatus').value,
            monthlyRent: document.getElementById('monthlyRent').value,
            utilities: document.getElementById('utilities').value,
            groceries: document.getElementById('groceries').value,
            transportation: document.getElementById('transportation').value
        },
        goals: {
            selectedGoal: selectedGoal,
            specificGoal: document.getElementById('specific-goal').value
        }
    };
    
    localStorage.setItem('financialFormData', JSON.stringify(formData));
    
    // Show notification
    saveNotification.classList.add('show');
    setTimeout(() => {
        saveNotification.classList.remove('show');
    }, 3000);
}

// Load form data from localStorage
function loadFormData() {
    const savedData = localStorage.getItem('financialFormData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        
        // Account section
        if (formData.account) {
            document.getElementById('fullName').value = formData.account.fullName || '';
            document.getElementById('email').value = formData.account.email || '';
            document.getElementById('country').value = formData.account.country || '';
            document.getElementById('password').value = formData.account.password || '';
            document.getElementById('confirmPassword').value = formData.account.password || '';
            if (formData.account.password) {
                validatePassword(formData.account.password);
            }
            
            // Update currency symbol
            if (formData.account.country) {
                updateCurrencySymbol(formData.account.country);
            }
        }
        
        // Income section
        if (formData.income) {
            document.getElementById('employmentStatus').value = formData.income.employmentStatus || '';
            document.getElementById('salary').value = formData.income.salary || '';
            document.getElementById('otherIncome').value = formData.income.otherIncome || '';
        }
        
        // Expenses section
        if (formData.expenses) {
            document.getElementById('housingStatus').value = formData.expenses.housingStatus || '';
            if (formData.expenses.housingStatus === 'rent') {
                rentSection.style.display = 'block';
            }
            document.getElementById('monthlyRent').value = formData.expenses.monthlyRent || '';
            document.getElementById('utilities').value = formData.expenses.utilities || '';
            document.getElementById('groceries').value = formData.expenses.groceries || '';
            document.getElementById('transportation').value = formData.expenses.transportation || '';
        }
        
        // Goals section
        if (formData.goals) {
            selectedGoal = formData.goals.selectedGoal || '';
            if (selectedGoal) {
                document.querySelector(`.goal-card[data-goal="${selectedGoal}"]`).classList.add('selected');
            }
            document.getElementById('specific-goal').value = formData.goals.specificGoal || '';
        }
        
        // Update preview
        updatePreview();
    }
}

// Update currency symbol based on country
function updateCurrencySymbol(countryCode) {
    currentCurrency = currencyMap[countryCode] || '$';
    currencySymbols.forEach(symbol => {
        symbol.textContent = currentCurrency;
    });
}

// Country selection change
countrySelect.addEventListener('change', function() {
    updateCurrencySymbol(this.value);
    updatePreview();
});

// Save buttons
saveAccountBtn.addEventListener('click', saveFormData);
saveIncomeBtn.addEventListener('click', saveFormData);
saveExpensesBtn.addEventListener('click', saveFormData);
saveGoalsBtn.addEventListener('click', saveFormData);
saveReviewBtn.addEventListener('click', saveFormData);

// Delete account functionality
deleteAccountBtn.addEventListener('click', () => {
    const confirmed = confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmed) {
        // Clear form fields
        document.getElementById('fullName').value = '';
        document.getElementById('email').value = '';
        document.getElementById('country').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirmPassword').value = '';
        document.getElementById('employmentStatus').value = '';
        document.getElementById('salary').value = '';
        document.getElementById('otherIncome').value = '';
        document.getElementById('housingStatus').value = '';
        document.getElementById('monthlyRent').value = '';
        document.getElementById('utilities').value = '';
        document.getElementById('groceries').value = '';
        document.getElementById('transportation').value = '';
        document.getElementById('specific-goal').value = '';
        
        // Clear password requirements indicators
        document.querySelectorAll('.password-requirements li').forEach(li => {
            li.className = '';
        });
        
        // Clear selected goal
        goalCards.forEach(card => card.classList.remove('selected'));
        selectedGoal = '';
        
        // Clear localStorage
        localStorage.removeItem('financialFormData');
        localStorage.removeItem('financialUserData');
        
        // Reset progress bar
        progressBar.style.width = '25%';
        
        // Switch back to Account section
        switchSection('account');
        
        // Show delete notification
        deleteNotification.classList.add('show');
        setTimeout(() => {
            deleteNotification.classList.remove('show');
        }, 3000);
        
        // Update preview
        updatePreview();
    }
});

// Submit form
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Validate review section
    if (!document.getElementById('agreement').checked) {
        // Show error message
        const agreementError = document.createElement('div');
        agreementError.className = 'validation-error';
        agreementError.textContent = 'Please agree to the terms and privacy policy';
        agreementError.style.display = 'block';
        agreementError.id = 'agreement-error';
        
        // Remove existing error if any
        const existingError = document.getElementById('agreement-error');
        if (existingError) existingError.remove();
        
        // Insert after agreement checkbox
        const agreementContainer = document.querySelector('.groupie');
        agreementContainer.after(agreementError);
        
        return;
    }
    
    // Get form values
    const userData = {
        account: {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            country: document.getElementById('country').value,
            password: document.getElementById('password').value
        },
        income: {
            employmentStatus: document.getElementById('employmentStatus').value,
            salary: document.getElementById('salary').value,
            otherIncome: document.getElementById('otherIncome').value
        },
        expenses: {
            housingStatus: document.getElementById('housingStatus').value,
            monthlyRent: document.getElementById('monthlyRent').value,
            utilities: document.getElementById('utilities').value,
            groceries: document.getElementById('groceries').value,
            transportation: document.getElementById('transportation').value
        },
        goals: {
            selectedGoal: selectedGoal,
            specificGoal: document.getElementById('specific-goal').value
        }
    };
    
    // Save to localStorage
    localStorage.setItem('financialUserData', JSON.stringify(userData));
    
    // Clear form progress
    localStorage.removeItem('financialFormData');
    
    // Hide form and show success message
    document.querySelector('.form-section.active').classList.remove('active');
    successMessage.style.display = 'block';
    
    // Update progress to 100%
    progressBar.style.width = '100%';
});

// View dashboard button
viewDashboardBtn.addEventListener('click', () => {
    // Check if account has been created
    const userData = localStorage.getItem('financialUserData');
    if (!userData) {
        alert("Please create an account first");
        return;
    }
    
    // Hide form container and show dashboard
    container.style.display = 'none';
    dashboardContainer.style.display = 'block';
    
    // Update dashboard with user data
    const userDataObj = JSON.parse(userData);
    
    // Account info
    document.getElementById('dashboard-name').textContent = userDataObj.account.fullName;
    document.getElementById('dashboard-email').textContent = userDataObj.account.email;
    
    // Set currency
    currentCurrency = currencyMap[userDataObj.account.country] || '$';
    
    // Income
    const primaryIncome = parseFloat(userDataObj.income.salary) || 0;
    const additionalIncome = parseFloat(userDataObj.income.otherIncome) || 0;
    const totalIncome = primaryIncome + additionalIncome;
    
    document.getElementById('primary-income').textContent = currentCurrency + primaryIncome.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('additional-income').textContent = currentCurrency + additionalIncome.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('total-income').textContent = currentCurrency + totalIncome.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
    // Expenses
    const housingExpense = parseFloat(userDataObj.expenses.monthlyRent) || 0;
    const utilitiesExpense = parseFloat(userDataObj.expenses.utilities) || 0;
    const foodExpense = parseFloat(userDataObj.expenses.groceries) || 0;
    const transportExpense = parseFloat(userDataObj.expenses.transportation) || 0;
    const totalExpenses = housingExpense + utilitiesExpense + foodExpense + transportExpense;
    
    document.getElementById('housing-expense').textContent = currentCurrency + housingExpense.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('utilities-expense').textContent = currentCurrency + utilitiesExpense.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('food-expense').textContent = currentCurrency + foodExpense.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('transport-expense').textContent = currentCurrency + transportExpense.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('total-expenses').textContent = currentCurrency + totalExpenses.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
    // Financial goal
    const goalMap = {
        'increase-income': {title: 'Increase Income', icon: 'chart-line'},
        'budget-management': {title: 'Budget Management', icon: 'wallet'},
        'debt-reduction': {title: 'Debt Reduction', icon: 'credit-card'},
        'savings-goal': {title: 'Savings Goal', icon: 'piggy-bank'},
        'investment-strategy': {title: 'Investment Strategy', icon: 'chart-pie'},
        'retirement-planning': {title: 'Retirement Planning', icon: 'umbrella-beach'}
    };
    
    const goal = goalMap[userDataObj.goals.selectedGoal] || {title: 'Not specified', icon: 'bullseye'};
    document.querySelector('.goal-card-dashboard h3 i').className = 'fas fa-' + goal.icon;
    document.querySelector('.goal-card-dashboard h3').innerHTML = `<i class="fas fa-${goal.icon}"></i> ${goal.title}`;
    document.querySelector('.goal-card-dashboard p').textContent = userDataObj.goals.specificGoal;
    
    // Financial health
    let healthPercentage = 50;
    if (totalIncome > 0) {
        const expenseRatio = (totalExpenses / totalIncome) * 100;
        healthPercentage = 100 - Math.min(expenseRatio, 100);
    }
    
    // Update gauge
    const gaugeFill = document.getElementById('gauge-fill');
    const gaugeValue = document.getElementById('gauge-value');
    const gaugePointer = document.getElementById('gauge-pointer');
    
    // Calculate rotation (0deg = 0%, 180deg = 100%)
    const rotation = healthPercentage * 1.8;
    gaugeFill.style.transform = `rotate(${rotation}deg)`;
    gaugePointer.style.transform = `rotate(${rotation}deg)`;
    gaugeValue.textContent = Math.round(healthPercentage) + '%';
    
    // Render chart
    renderChart(totalIncome, housingExpense, utilitiesExpense, foodExpense, transportExpense);
    
    // Render net worth chart
    renderNetWorthChart();
    
    // Generate country-specific recommendations
    generateCountryRecommendations(userDataObj.account.country);
});

// Function to render the chart
function renderChart(totalIncome, housingExpense, utilitiesExpense, foodExpense, transportExpense) {
    const container = document.getElementById('chart-container');
    const categories = ['Housing', 'Utilities', 'Food', 'Transportation', 'Income'];
    const values = [
        housingExpense,
        utilitiesExpense,
        foodExpense,
        transportExpense,
        totalIncome
    ];
    
    // Find max value for scaling
    const maxValue = Math.max(...values);
    
    // Clear container
    container.innerHTML = '';
    
    // Create bars
    categories.forEach((category, index) => {
        const barHeight = values[index] > 0 ? (values[index] / maxValue) * 200 : 10;
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = barHeight + 'px';
        
        // Add different colors to bars
        if (category === 'Income') {
            bar.style.background = 'linear-gradient(to top, #27ae60, #219653)';
        } else if (category === 'Housing') {
            bar.style.background = 'linear-gradient(to top, #e74c3c, #c0392b)';
        } else if (category === 'Utilities') {
            bar.style.background = 'linear-gradient(to top, #3498db, #2980b9)';
        } else if (category === 'Food') {
            bar.style.background = 'linear-gradient(to top, #f39c12, #e67e22)';
        } else if (category === 'Transportation') {
            bar.style.background = 'linear-gradient(to top, #9b59b6, #8e44ad)';
        }
        
        const valueLabel = document.createElement('div');
        valueLabel.className = 'chart-value';
        valueLabel.textContent = currentCurrency + values[index].toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
        
        const categoryLabel = document.createElement('div');
        categoryLabel.className = 'chart-label';
        categoryLabel.textContent = category;
        
        bar.appendChild(valueLabel);
        bar.appendChild(categoryLabel);
        container.appendChild(bar);
        
        // Animate the bar
        setTimeout(() => {
            bar.style.height = barHeight + 'px';
        }, index * 200);
    });
}

// Function to render net worth chart
function renderNetWorthChart() {
    const container = document.querySelector('.net-worth-chart');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const netWorthValues = [100000, 105000, 110000, 115000, 120000, 125000, 130000, 135000, 140000, 145000, 150000, 155000];
    
    // Find max value for scaling
    const maxValue = Math.max(...netWorthValues);
    
    // Clear container
    container.innerHTML = '';
    
    // Create bars
    months.forEach((month, index) => {
        const barHeight = (netWorthValues[index] / maxValue) * 250;
        const bar = document.createElement('div');
        bar.className = 'net-worth-bar';
        bar.style.height = barHeight + 'px';
        bar.style.background = 'linear-gradient(to top, #27ae60, #2ecc71)';
        
        const valueLabel = document.createElement('div');
        valueLabel.className = 'chart-value';
        valueLabel.textContent = currentCurrency + netWorthValues[index].toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
        valueLabel.style.top = `-30px`;
        
        const monthLabel = document.createElement('div');
        monthLabel.className = 'chart-label';
        monthLabel.textContent = month;
        
        bar.appendChild(valueLabel);
        bar.appendChild(monthLabel);
        container.appendChild(bar);
        
        // Animate the bar
        setTimeout(() => {
            bar.style.height = barHeight + 'px';
        }, index * 100);
    });
}

// Back to form button
backToFormBtn.addEventListener('click', () => {
    dashboardContainer.style.display = 'none';
    container.style.display = 'block';
});

// Generate AI recommendations
generateRecommendationsBtn.addEventListener('click', async () => {
    // Show loading state
    aiLoading.style.display = 'flex';
    recommendationsList.style.display = 'none';
    aiNotification.classList.add('show');
    
    try {
        // Get user data
        const userData = JSON.parse(localStorage.getItem('financialUserData'));
        
        // Format the financial data for AI
        const financialData = {
            goal: userData.goals.selectedGoal,
            income: parseFloat(userData.income.salary) + parseFloat(userData.income.otherIncome),
            expenses: {
                housing: parseFloat(userData.expenses.monthlyRent) || 0,
                utilities: parseFloat(userData.expenses.utilities) || 0,
                food: parseFloat(userData.expenses.groceries) || 0,
                transportation: parseFloat(userData.expenses.transportation) || 0
            },
            netIncome: (parseFloat(userData.income.salary) + parseFloat(userData.income.otherIncome)) - 
                        (parseFloat(userData.expenses.monthlyRent) + 
                        parseFloat(userData.expenses.utilities) + 
                        parseFloat(userData.expenses.groceries) + 
                        parseFloat(userData.expenses.transportation)),
            country: userData.account.country || 'US',
            currency: currencyMap[userData.account.country] || '$'
        };
        
        // Generate recommendations (simulated for this example)
        const recommendations = await generateAIFinancialRecommendations(financialData);
        
        // Display recommendations
        displayRecommendations(recommendations);
        
        // Hide loading state
        aiLoading.style.display = 'none';
        recommendationsList.style.display = 'block';
        
        // Hide notification after a delay
        setTimeout(() => {
            aiNotification.classList.remove('show');
        }, 2000);
        
    } catch (error) {
        console.error('Error generating recommendations:', error);
        aiLoading.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <p>Failed to generate recommendations</p>
            <p>Please try again later</p>
        `;
        
        // Hide notification
        setTimeout(() => {
            aiNotification.classList.remove('show');
        }, 3000);
    }
});

// Simulated AI recommendation generator
async function generateAIFinancialRecommendations(data) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const recommendations = [];
    const country = data.country || 'US';
    const currency = data.currency || '$';
    
    // Common recommendations
    if (data.netIncome < 0) {
        recommendations.push({
            title: "Reduce Expenses Immediately",
            content: `Your expenses exceed your income by ${currency}${Math.abs(data.netIncome).toLocaleString()}. Consider cutting discretionary spending and finding ways to reduce fixed costs.`,
            priority: "high"
        });
    } else if (data.netIncome < 500) {
        recommendations.push({
            title: "Build an Emergency Fund",
            content: `Start setting aside a small portion (at least 10%) of your monthly surplus (${currency}${data.netIncome.toLocaleString()}) to build a financial safety net.`,
            priority: "medium"
        });
    }
    
    // Country-specific recommendations
    if (country === 'US') {
        recommendations.push({
            title: "US: Consider a Roth IRA",
            content: "Based on your income, you may benefit from contributing to a Roth IRA for tax-free retirement savings. The 2023 contribution limit is $6,500 ($7,500 if age 50 or older).",
            priority: "medium"
        });
    } else if (country === 'UK') {
        recommendations.push({
            title: "UK: Maximize Your ISA Allowance",
            content: "Consider using your annual ISA allowance (£20,000 for 2023) to shelter savings and investments from UK income tax. This can significantly improve long-term wealth growth.",
            priority: "medium"
        });
    } else if (country === 'CA') {
        recommendations.push({
            title: "Canada: Utilize TFSA Contributions",
            content: `You might benefit from maximizing your Tax-Free Savings Account contributions (${currency}6,500 for 2023) for tax-free growth. Unused contribution room carries forward indefinitely.`,
            priority: "medium"
        });
    } else if (country === 'AU') {
        recommendations.push({
            title: "Australia: Consider Salary Sacrificing",
            content: "Salary sacrificing into superannuation could reduce your taxable income while boosting retirement savings. The concessional contributions cap is $27,500 per year.",
            priority: "medium"
        });
    } else if (country === 'IN') {
        recommendations.push({
            title: "India: Explore PPF Accounts",
            content: "Public Provident Fund accounts offer attractive interest rates (currently 7.1%) with tax benefits under Section 80C. The maximum annual contribution is ₹1.5 lakh.",
            priority: "medium"
        });
    }
    
    // Goal-specific recommendations
    switch(data.goal) {
        case 'increase-income':
            recommendations.push({
                title: "Develop New Skills",
                content: "Consider taking online courses in high-demand fields like data science, digital marketing, or cloud computing to increase your earning potential.",
                priority: "medium"
            }, {
                title: "Explore Side Hustles",
                content: "Look for freelance opportunities or part-time work that aligns with your skills and interests. Platforms like Upwork or Fiverr can help you get started.",
                priority: "medium"
            });
            break;
            
        case 'debt-reduction':
            recommendations.push({
                title: "Prioritize High-Interest Debt",
                content: "Focus on paying off debts with the highest interest rates first to save money in the long term. Consider the avalanche method for maximum efficiency.",
                priority: "high"
            }, {
                title: "Consider Debt Consolidation",
                content: "Explore options to consolidate multiple debts into a single loan with a lower interest rate. This can simplify payments and reduce total interest costs.",
                priority: "medium"
            });
            break;
            
        case 'savings-goal':
            recommendations.push({
                title: "Automate Your Savings",
                content: `Set up automatic transfers of ${currency}${Math.max(50, data.netIncome * 0.1).toLocaleString()} to a dedicated savings account each pay period. This ensures consistent saving without effort.`,
                priority: "high"
            }, {
                title: "Create a Savings Timeline",
                content: "Define specific milestones and timelines for your savings goals to stay motivated. Break large goals into smaller, achievable targets.",
                priority: "medium"
            });
            break;
            
        case 'investment-strategy':
            recommendations.push({
                title: "Diversify Your Portfolio",
                content: "Consider spreading your investments across different asset classes (stocks, bonds, real estate) to minimize risk. A well-diversified portfolio typically yields better long-term results.",
                priority: "medium"
            }, {
                title: "Start with Low-Cost Index Funds",
                content: "For beginners, low-cost index funds provide broad market exposure with minimal fees. Consider funds tracking major indices like the S&P 500 or MSCI World.",
                priority: "medium"
            });
            break;
            
        default:
            recommendations.push({
                title: "Review Budget Monthly",
                content: "Regularly track your spending against your budget to identify areas for improvement. Use apps like Mint or YNAB to streamline this process.",
                priority: "medium"
            }, {
                title: "Set Specific Financial Goals",
                content: "Define clear, measurable financial objectives with target dates to stay focused. SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) work best.",
                priority: "low"
            });
    }
    
    // Always include these general recommendations
    recommendations.push({
        title: "Review Subscriptions",
        content: `Audit your ${currency}${data.expenses.utilities} monthly subscriptions and cancel any services you no longer use regularly. This can free up ${currency}${(data.expenses.utilities * 0.2).toLocaleString()} or more each month.`,
        priority: "low"
    }, {
        title: "Plan Meals in Advance",
        content: `Reduce your ${currency}${data.expenses.food} food expenses by planning meals weekly and shopping with a grocery list. This can save 15-20% on your food budget.`,
        priority: "low"
    });
    
    return recommendations;
}

// Display recommendations
function displayRecommendations(recommendations) {
    recommendationsList.innerHTML = '';
    
    recommendations.forEach(rec => {
        const item = document.createElement('div');
        item.className = `recommendation-item priority-${rec.priority}`;
        
        const iconMap = {
            "high": "exclamation-triangle",
            "medium": "lightbulb",
            "low": "info-circle"
        };
        
        item.innerHTML = `
            <div class="recommendation-icon">
                <i class="fas fa-${iconMap[rec.priority]}"></i>
            </div>
            <div class="recommendation-content">
                <h4>${rec.title}</h4>
                <p>${rec.content}</p>
            </div>
        `;
        
        recommendationsList.appendChild(item);
    });
    
    recommendationsList.style.display = 'block';
}

// Generate country-specific recommendations
function generateCountryRecommendations(countryCode) {
    const recommendations = {
        'US': [
            {
                title: "401(k) Contribution Strategy",
                content: "Maximize your 401(k) contributions to take advantage of tax-deferred growth and potential employer matching."
            },
            {
                title: "Tax Planning",
                content: "Consider tax-loss harvesting strategies to offset capital gains with capital losses in your investment portfolio."
            }
        ],
        'UK': [
            {
                title: "ISA Contributions",
                content: "Maximize your annual ISA allowance to shelter savings and investments from UK income tax."
            },
            {
                title: "Pension Planning",
                content: "Review your pension contributions to take advantage of tax relief on pension savings."
            }
        ],
        'CA': [
            {
                title: "TFSA Strategy",
                content: "Contribute to your Tax-Free Savings Account for tax-free growth on investments."
            },
            {
                title: "RRSP Contributions",
                content: "Consider contributing to an RRSP for tax-deferred growth and immediate tax deductions."
            }
        ],
        'AU': [
            {
                title: "Superannuation Optimization",
                content: "Consider salary sacrificing into your super fund to reduce taxable income."
            },
            {
                title: "First Home Super Saver Scheme",
                content: "If saving for your first home, explore the FHSSS for potential tax benefits."
            }
        ],
        'IN': [
            {
                title: "PPF Investments",
                content: "Consider Public Provident Fund accounts for tax benefits under Section 80C."
            },
            {
                title: "NPS Contributions",
                content: "Explore the National Pension Scheme for additional tax benefits under Section 80CCD(1B)."
            }
        ],
        'default': [
            {
                title: "Tax Optimization",
                content: "Consult with a tax professional to identify country-specific tax savings opportunities."
            },
            {
                title: "Retirement Planning",
                content: "Explore retirement savings options available in your country of residence."
            }
        ]
    };
    
    const countryRecs = recommendations[countryCode] || recommendations['default'];
    
    // Clear container
    countryRecommendationsContent.innerHTML = '';
    
    // Create cards
    countryRecs.forEach(rec => {
        const card = document.createElement('div');
        card.className = 'country-card';
        card.innerHTML = `
            <div class="country-card-header">
                <i class="fas fa-lightbulb"></i>
                <h3>${rec.title}</h3>
            </div>
            <div class="country-card-content">
                <p>${rec.content}</p>
            </div>
        `;
        countryRecommendationsContent.appendChild(card);
    });
}

// Dashboard navigation
function setupDashboardNavigation() {
    dashboardNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            
            // Hide all sections
            dashboardSections.forEach(sec => {
                sec.classList.remove('active');
            });
            
            // Show selected section
            document.getElementById(`${section}-section`).classList.add('active');
        });
    });
}

// Initialize form
document.addEventListener('DOMContentLoaded', () => {
    // Load saved data
    loadFormData();
    
    // Add event listeners for real-time validation
    document.getElementById('fullName').addEventListener('input', () => {
        if (document.getElementById('fullName').value.trim()) {
            document.getElementById('name-error').style.display = 'none';
        }
    });
    
    document.getElementById('email').addEventListener('input', () => {
        const email = document.getElementById('email').value;
        if (email && validateEmail(email)) {
            document.getElementById('email-error').style.display = 'none';
        }
    });
    
    document.getElementById('country').addEventListener('change', () => {
        if (document.getElementById('country').value) {
            document.getElementById('country-error').style.display = 'none';
        }
    });
    
    // Real-time calculation for expenses section
    const expenseInputs = document.querySelectorAll('#expenses-section input[type="number"]');
    expenseInputs.forEach(input => {
        input.addEventListener('input', updatePreview);
    });
    
    // Real-time calculation for income section
    const incomeInputs = document.querySelectorAll('#income-section input[type="number"]');
    incomeInputs.forEach(input => {
        input.addEventListener('input', updatePreview);
    });
    
    // Initial preview update
    updatePreview();
    
    // Initialize the chart in dashboard
    if (dashboardContainer.style.display === 'block') {
        renderChart(5000, 1200, 250, 600, 350);
        renderNetWorthChart();
    }
    
    // Setup dashboard navigation
    setupDashboardNavigation();
});
