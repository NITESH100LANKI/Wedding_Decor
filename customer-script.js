// Customer JavaScript for EventCraft Customer Portal

document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${targetTab}-form`) {
                    form.classList.add('active');
                }
            });
        });
    });

    // Password visibility toggle
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    // Form validation and submission
    const loginForm = document.querySelector('#login-form form');
    const registerForm = document.querySelector('#register-form form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Login handler
    async function handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        // Basic validation
        if (!email || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        try {
            // Simulate API call
            showNotification('Logging in...', 'info');
            
            // For demo purposes, simulate successful login
            setTimeout(() => {
                // Store user data
                const userData = {
                    email: email,
                    name: email.split('@')[0], // Extract name from email for demo
                    type: 'customer',
                    loginTime: new Date().toISOString()
                };
                
                if (rememberMe) {
                    localStorage.setItem('eventcraft_user', JSON.stringify(userData));
                } else {
                    sessionStorage.setItem('eventcraft_user', JSON.stringify(userData));
                }
                
                showNotification('Login successful!', 'success');
                
                // Show dashboard
                showDashboard(userData);
            }, 1500);
            
        } catch (error) {
            showNotification('Login failed. Please try again.', 'error');
            console.error('Login error:', error);
        }
    }

    // Registration handler
    async function handleRegister(e) {
        e.preventDefault();
        
        const formData = {
            firstName: document.getElementById('register-firstname').value,
            lastName: document.getElementById('register-lastname').value,
            email: document.getElementById('register-email').value,
            phone: document.getElementById('register-phone').value,
            city: document.getElementById('register-city').value,
            password: document.getElementById('register-password').value,
            confirmPassword: document.getElementById('register-confirm-password').value,
            terms: document.getElementById('terms').checked
        };
        
        // Validation
        if (!formData.terms) {
            showNotification('Please accept the terms and conditions', 'error');
            return;
        }
        
        if (formData.password !== formData.confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        if (formData.password.length < 6) {
            showNotification('Password must be at least 6 characters long', 'error');
            return;
        }
        
        try {
            showNotification('Creating account...', 'info');
            
            // Simulate API call
            setTimeout(() => {
                const userData = {
                    email: formData.email,
                    name: `${formData.firstName} ${formData.lastName}`,
                    phone: formData.phone,
                    city: formData.city,
                    type: 'customer',
                    registrationTime: new Date().toISOString()
                };
                
                // Store user data
                localStorage.setItem('eventcraft_user', JSON.stringify(userData));
                
                showNotification('Account created successfully!', 'success');
                
                // Auto-login and show dashboard
                showDashboard(userData);
            }, 2000);
            
        } catch (error) {
            showNotification('Registration failed. Please try again.', 'error');
            console.error('Registration error:', error);
        }
    }

    // Show dashboard
    function showDashboard(userData) {
        // Hide auth forms
        document.querySelectorAll('.auth-form').forEach(form => {
            form.style.display = 'none';
        });
        
        // Hide auth tabs
        document.querySelector('.auth-tabs').style.display = 'none';
        
        // Update customer name
        document.getElementById('customer-name').textContent = userData.name;
        
        // Show dashboard
        const dashboard = document.getElementById('customer-dashboard');
        dashboard.style.display = 'block';
        
        // Update header
        document.querySelector('.customer-header h1').textContent = `Welcome back, ${userData.name}!`;
        document.querySelector('.customer-header p').textContent = 'Manage your events and bookings';
    }

    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Clear stored data
            localStorage.removeItem('eventcraft_user');
            sessionStorage.removeItem('eventcraft_user');
            
            // Reload page to show login form
            location.reload();
        });
    }

    // Check if user is already logged in
    function checkLoginStatus() {
        const userData = JSON.parse(localStorage.getItem('eventcraft_user')) || 
                        JSON.parse(sessionStorage.getItem('eventcraft_user'));
        
        if (userData && userData.type === 'customer') {
            showDashboard(userData);
        }
    }

    // Social login handlers
    const googleBtn = document.querySelector('.social-btn.google');
    const facebookBtn = document.querySelector('.social-btn.facebook');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            showNotification('Google login coming soon!', 'info');
        });
    }
    
    if (facebookBtn) {
        facebookBtn.addEventListener('click', function() {
            showNotification('Facebook login coming soon!', 'info');
        });
    }

    // Dashboard action buttons
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            
            switch(action) {
                case 'Book New Event':
                    showNotification('Redirecting to event booking...', 'info');
                    // Redirect to booking page
                    setTimeout(() => {
                        window.location.href = 'index.html#packages';
                    }, 1000);
                    break;
                    
                case 'View Bookings':
                    showNotification('Loading your bookings...', 'info');
                    break;
                    
                case 'Favorites':
                    showNotification('Loading your favorites...', 'info');
                    break;
                    
                case 'Settings':
                    showNotification('Opening settings...', 'info');
                    break;
                    
                default:
                    showNotification('Action not implemented yet', 'info');
            }
        });
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add notification styles if not already added
        if (!document.querySelector('#customer-notification-styles')) {
            const notificationStyles = document.createElement('style');
            notificationStyles.id = 'customer-notification-styles';
            notificationStyles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10000;
                    max-width: 400px;
                    animation: slideInRight 0.3s ease-out;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 15px 20px;
                    border-radius: 10px;
                    color: white;
                    font-weight: 500;
                }
                
                .notification-success {
                    background: linear-gradient(135deg, #ff6b9d, #c44569);
                }
                
                .notification-error {
                    background: linear-gradient(135deg, #e74c3c, #c0392b);
                }
                
                .notification-info {
                    background: linear-gradient(135deg, #4ecdc4, #44a08d);
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 20px;
                    cursor: pointer;
                    margin-left: 15px;
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(notificationStyles);
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
    }

    // Form input animations
    const formInputs = document.querySelectorAll('.input-group input, .input-group select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // Check login status on page load
    checkLoginStatus();

    console.log('🎉 EventCraft Customer Portal loaded successfully!');
});
