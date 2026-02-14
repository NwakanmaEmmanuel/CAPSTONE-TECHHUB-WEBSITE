// ===== CONTACT FORM HANDLING =====

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateContactForm()) {
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual backend call)
            setTimeout(() => {
                // Show success message
                showMessage('success', 'Thank you for your message! We\'ll get back to you soon.');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Log form data (in production, send to backend)
                console.log('Form submitted:', formData);
                
                // In a real application, you would send this data to your server:
                // fetch('/api/contact', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(formData)
                // })
                // .then(response => response.json())
                // .then(data => {
                //     showMessage('success', 'Message sent successfully!');
                //     contactForm.reset();
                // })
                // .catch(error => {
                //     showMessage('error', 'Failed to send message. Please try again.');
                // });
                
            }, 1500);
        }
    });
}

// ===== FORM VALIDATION =====
function validateContactForm() {
    let isValid = true;
    
    // Get form fields
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    // Clear previous errors
    clearErrors();
    
    // Validate name
    if (name.value.trim() === '') {
        showFieldError(name, 'Please enter your name');
        isValid = false;
    }
    
    // Validate email
    if (email.value.trim() === '') {
        showFieldError(email, 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (subject.value === '') {
        showFieldError(subject, 'Please select a subject');
        isValid = false;
    }
    
    // Validate message
    if (message.value.trim() === '') {
        showFieldError(message, 'Please enter your message');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showFieldError(message, 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

// ===== EMAIL VALIDATION =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== SHOW FIELD ERROR =====
function showFieldError(field, message) {
    field.classList.add('error');
    
    // Create error message element if it doesn't exist
    let errorDiv = field.parentElement.querySelector('.field-error');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        field.parentElement.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '5px';
}

// ===== CLEAR ERRORS =====
function clearErrors() {
    // Remove error class from all fields
    document.querySelectorAll('.error').forEach(field => {
        field.classList.remove('error');
    });
    
    // Remove all error messages
    document.querySelectorAll('.field-error').forEach(error => {
        error.remove();
    });
}

// ===== SHOW FORM MESSAGE =====
function showMessage(type, text) {
    formMessage.className = `form-message ${type}`;
    formMessage.textContent = text;
    formMessage.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ===== REAL-TIME VALIDATION =====
// Add event listeners for real-time validation
const formFields = ['name', 'email', 'subject', 'message'];
formFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
        field.addEventListener('blur', function() {
            // Clear error when field is valid
            if (this.value.trim() !== '') {
                this.classList.remove('error');
                const errorDiv = this.parentElement.querySelector('.field-error');
                if (errorDiv) {
                    errorDiv.remove();
                }
            }
        });
        
        // Remove error on input
        field.addEventListener('input', function() {
            if (this.classList.contains('error') && this.value.trim() !== '') {
                this.classList.remove('error');
                const errorDiv = this.parentElement.querySelector('.field-error');
                if (errorDiv) {
                    errorDiv.remove();
                }
            }
        });
    }
});

// ===== PHONE NUMBER FORMATTING (Optional) =====
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        // Remove non-numeric characters except + and spaces
        let value = e.target.value.replace(/[^\d+\s]/g, '');
        e.target.value = value;
    });
}

// ===== FORM ANALYTICS (Optional) =====
// Track which subjects are most commonly selected
const subjectSelect = document.getElementById('subject');
if (subjectSelect) {
    subjectSelect.addEventListener('change', function() {
        console.log('Subject selected:', this.value);
        // In production, you might want to send this to analytics
    });
}

console.log('Contact form initialized ✅');
