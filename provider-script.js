// Provider JavaScript for EventCraft Provider Portal

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
        loginForm.addEventListener('submit', handleProviderLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleProviderRegister);
    }

    // Provider Login handler
    async function handleProviderLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
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
                // Store provider data
                const providerData = {
                    email: email,
                    name: email.split('@')[0], // Extract name from email for demo
                    type: 'provider',
                    loginTime: new Date().toISOString()
                };
                
                localStorage.setItem('eventcraft_provider', JSON.stringify(providerData));
                
                showNotification('Login successful!', 'success');
                
                // Redirect to provider dashboard or show success message
                setTimeout(() => {
                    showNotification('Welcome to EventCraft! You can now start adding your services.', 'success');
                }, 1000);
                
            }, 1500);
            
        } catch (error) {
            showNotification('Login failed. Please try again.', 'error');
            console.error('Login error:', error);
        }
    }

    // Provider Registration handler
    async function handleProviderRegister(e) {
        e.preventDefault();
        
        const formData = {
            businessName: document.getElementById('business-name').value,
            businessType: document.getElementById('business-type').value,
            ownerName: document.getElementById('owner-name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('business-email').value,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirm-password').value,
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
        
        if (!formData.businessName || !formData.businessType || !formData.ownerName || !formData.phone || !formData.email) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        try {
            showNotification('Creating business account...', 'info');
            
            // Simulate API call
            setTimeout(() => {
                const providerData = {
                    businessName: formData.businessName,
                    businessType: formData.businessType,
                    ownerName: formData.ownerName,
                    phone: formData.phone,
                    email: formData.email,
                    type: 'provider',
                    registrationTime: new Date().toISOString(),
                    status: 'pending_verification'
                };
                
                // Store provider data
                localStorage.setItem('eventcraft_provider', JSON.stringify(providerData));
                
                showNotification('Business account created successfully!', 'success');
                
                // Show next steps
                setTimeout(() => {
                    showNotification('Please complete your profile and add your services to start receiving bookings.', 'info');
                }, 1000);
                
                // Clear form
                registerForm.reset();
                
            }, 2000);
            
        } catch (error) {
            showNotification('Registration failed. Please try again.', 'error');
            console.error('Registration error:', error);
        }
    }

    // Check if provider is already logged in
    function checkProviderLoginStatus() {
        const providerData = JSON.parse(localStorage.getItem('eventcraft_provider'));
        
        if (providerData && providerData.type === 'provider') {
            showNotification(`Welcome back, ${providerData.businessName || providerData.name}!`, 'success');
        }
    }

    // Form input animations
    const formInputs = document.querySelectorAll('.input-group input, .input-group select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.boxShadow = '0 0 0 3px rgba(78, 205, 196, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
            this.parentElement.style.boxShadow = 'none';
        });
    });

    // Business type selection enhancement
    const businessTypeSelect = document.getElementById('business-type');
    if (businessTypeSelect) {
        businessTypeSelect.addEventListener('change', function() {
            const selectedValue = this.value;
            if (selectedValue) {
                this.style.borderColor = '#4ecdc4';
                this.style.color = '#2c3e50';
            } else {
                this.style.borderColor = '#e9ecef';
                this.style.color = '#6c757d';
            }
        });
    }

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            
            if (value.length >= 6) {
                value = value.replace(/(\d{5})(\d{5})/, '$1-$2');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{0,7})/, '$1-$2');
            }
            
            this.value = value;
        });
    }

    // Password strength indicator
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            if (password.length >= 6) strength++;
            if (password.match(/[a-z]/)) strength++;
            if (password.match(/[A-Z]/)) strength++;
            if (password.match(/[0-9]/)) strength++;
            if (password.match(/[^a-zA-Z0-9]/)) strength++;
            
            // Update password strength indicator
            updatePasswordStrength(strength);
        });
    }
    
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            const password = passwordInput.value;
            const confirmPassword = this.value;
            
            if (confirmPassword && password !== confirmPassword) {
                this.style.borderColor = '#e74c3c';
                showNotification('Passwords do not match', 'error');
            } else if (confirmPassword) {
                this.style.borderColor = '#4ecdc4';
            } else {
                this.style.borderColor = '#e9ecef';
            }
        });
    }

    // Password strength indicator function
    function updatePasswordStrength(strength) {
        // Remove existing strength indicator
        const existingIndicator = document.querySelector('.password-strength');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        
        if (passwordInput.value.length === 0) return;
        
        const strengthIndicator = document.createElement('div');
        strengthIndicator.className = 'password-strength';
        
        let strengthText = '';
        let strengthColor = '';
        
        switch(strength) {
            case 0:
            case 1:
                strengthText = 'Very Weak';
                strengthColor = '#e74c3c';
                break;
            case 2:
                strengthText = 'Weak';
                strengthColor = '#f39c12';
                break;
            case 3:
                strengthText = 'Fair';
                strengthColor = '#f1c40f';
                break;
            case 4:
                strengthText = 'Good';
                strengthColor = '#27ae60';
                break;
            case 5:
                strengthText = 'Strong';
                strengthColor = '#2ecc71';
                break;
        }
        
        strengthIndicator.innerHTML = `
            <div class="strength-bar">
                <div class="strength-fill" style="width: ${(strength / 5) * 100}%; background-color: ${strengthColor};"></div>
            </div>
            <span class="strength-text" style="color: ${strengthColor};">${strengthText}</span>
        `;
        
        // Add styles for strength indicator
        if (!document.querySelector('#password-strength-styles')) {
            const strengthStyles = document.createElement('style');
            strengthStyles.id = 'password-strength-styles';
            strengthStyles.textContent = `
                .password-strength {
                    margin-top: 5px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .strength-bar {
                    flex: 1;
                    height: 4px;
                    background-color: #e9ecef;
                    border-radius: 2px;
                    overflow: hidden;
                }
                
                .strength-fill {
                    height: 100%;
                    transition: width 0.3s ease, background-color 0.3s ease;
                }
                
                .strength-text {
                    font-size: 0.8rem;
                    font-weight: 600;
                    min-width: 80px;
                }
            `;
            document.head.appendChild(strengthStyles);
        }
        
        passwordInput.parentElement.appendChild(strengthIndicator);
    }

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
        if (!document.querySelector('#provider-notification-styles')) {
            const notificationStyles = document.createElement('style');
            notificationStyles.id = 'provider-notification-styles';
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
                    background: linear-gradient(135deg, #4ecdc4, #44a08d);
                }
                
                .notification-error {
                    background: linear-gradient(135deg, #e74c3c, #c0392b);
                }
                
                .notification-info {
                    background: linear-gradient(135deg, #3498db, #2980b9);
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

    // Check provider login status on page load
    checkProviderLoginStatus();

    // Dashboard functionality
    initializeDashboard();

    console.log('🏢 EventCraft Provider Portal loaded successfully!');
});

// Dashboard functionality
function initializeDashboard() {
    // Check if provider is logged in and show dashboard
    const providerData = JSON.parse(localStorage.getItem('eventcraft_provider'));
    
    if (providerData && providerData.type === 'provider') {
        showProviderDashboard(providerData);
    }
    
    // Add dashboard event listeners
    addDashboardEventListeners();
}

function showProviderDashboard(providerData) {
    // Hide auth forms and show dashboard
    document.querySelector('.provider-container').style.display = 'none';
    document.getElementById('provider-dashboard').style.display = 'block';
    
    // Update dashboard with provider info
    document.getElementById('provider-business-name').textContent = providerData.businessName || providerData.name || 'Provider';
    
    // Load dashboard data
    loadDashboardData();
}

function addDashboardEventListeners() {
    // Sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active link
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            const targetSection = this.dataset.section;
            showDashboardSection(targetSection);
        });
    });
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Add service form
    const addServiceForm = document.getElementById('add-service-form');
    if (addServiceForm) {
        addServiceForm.addEventListener('submit', handleAddService);
    }
    
    // Profile form
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', handleUpdateProfile);
    }
    
    // Image upload handling
    const imageUpload = document.getElementById('service-images');
    if (imageUpload) {
        imageUpload.addEventListener('change', handleImageUpload);
    }
    
    // Booking status filter
    const bookingFilter = document.getElementById('booking-status-filter');
    if (bookingFilter) {
        bookingFilter.addEventListener('change', filterBookings);
    }
}

function showDashboardSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function loadDashboardData() {
    // Load mock data for demonstration
    loadMockDashboardData();
    
    // In real app, this would fetch data from API
    // loadProviderServices();
    // loadProviderBookings();
    // loadProviderEarnings();
    // loadProviderReviews();
}

function loadMockDashboardData() {
    // Mock overview stats
    document.getElementById('total-bookings').textContent = '12';
    document.getElementById('total-earnings').textContent = '₹45,000';
    document.getElementById('avg-rating').textContent = '4.8';
    document.getElementById('total-services').textContent = '5';
    
    // Mock monthly and yearly earnings
    document.getElementById('monthly-earnings').textContent = '₹15,000';
    document.getElementById('yearly-earnings').textContent = '₹45,000';
    
    // Mock overall rating
    document.getElementById('overall-rating').textContent = '4.8';
    
    // Mock recent activity
    const activityList = document.getElementById('activity-list');
    if (activityList) {
        activityList.innerHTML = `
            <div class="activity-item">
                <i class="fas fa-calendar-check"></i>
                <span>New booking received for Wedding Decoration Package</span>
            </div>
            <div class="activity-item">
                <i class="fas fa-star"></i>
                <span>Received 5-star review from Priya & Arjun</span>
            </div>
            <div class="activity-item">
                <i class="fas fa-plus-circle"></i>
                <span>Added new service: Birthday Party Decoration</span>
            </div>
        `;
    }
}

function handleLogout() {
    // Clear provider data
    localStorage.removeItem('eventcraft_provider');
    
    // Show auth forms and hide dashboard
    document.querySelector('.provider-container').style.display = 'block';
    document.getElementById('provider-dashboard').style.display = 'none';
    
    // Reset forms
    document.querySelector('#login-form form').reset();
    document.querySelector('#register-form form').reset();
    
    // Show logout message
    showNotification('Logged out successfully', 'success');
}

function handleAddService(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('service-name').value,
        category: document.getElementById('service-category').value,
        price: document.getElementById('service-price').value,
        duration: document.getElementById('service-duration').value,
        description: document.getElementById('service-description').value,
        location: document.getElementById('service-location').value,
        features: document.getElementById('service-features').value,
        images: document.getElementById('service-images').files
    };
    
    // Validation
    if (!formData.name || !formData.category || !formData.price || !formData.description || !formData.location) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (formData.images.length < 3) {
        showNotification('Please upload at least 3 photos', 'error');
        return;
    }
    
    // Simulate service creation
    showNotification('Adding service...', 'info');
    
    setTimeout(() => {
        // Store service data (in real app, this would go to database)
        const services = JSON.parse(localStorage.getItem('eventcraft_provider_services') || '[]');
        const newService = {
            id: Date.now(),
            ...formData,
            createdAt: new Date().toISOString(),
            status: 'active'
        };
        
        services.push(newService);
        localStorage.setItem('eventcraft_provider_services', JSON.stringify(services));
        
        showNotification('Service added successfully!', 'success');
        
        // Reset form
        e.target.reset();
        document.getElementById('image-preview').innerHTML = '';
        
        // Update services count
        document.getElementById('total-services').textContent = services.length;
        
        // Switch to services section
        showDashboardSection('services');
        loadProviderServices();
    }, 1500);
}

function handleImageUpload(e) {
    const files = Array.from(e.target.files);
    const preview = document.getElementById('image-preview');
    
    if (files.length < 3) {
        showNotification('Please select at least 3 images', 'error');
        return;
    }
    
    if (files.length > 10) {
        showNotification('Maximum 10 images allowed', 'error');
        return;
    }
    
    preview.innerHTML = '';
    
    files.forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Service image';
                preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });
}

function handleUpdateProfile(e) {
    e.preventDefault();
    
    const formData = {
        businessName: document.getElementById('profile-business-name').value,
        businessType: document.getElementById('profile-business-type').value,
        ownerName: document.getElementById('profile-owner-name').value,
        phone: document.getElementById('profile-phone').value,
        email: document.getElementById('profile-email').value,
        description: document.getElementById('profile-description').value,
        address: document.getElementById('profile-address').value
    };
    
    // Update provider data
    const providerData = JSON.parse(localStorage.getItem('eventcraft_provider'));
    const updatedData = { ...providerData, ...formData };
    localStorage.setItem('eventcraft_provider', JSON.stringify(updatedData));
    
    // Update dashboard display
    document.getElementById('provider-business-name').textContent = updatedData.businessName;
    
    showNotification('Profile updated successfully!', 'success');
}

function loadProviderServices() {
    const services = JSON.parse(localStorage.getItem('eventcraft_provider_services') || '[]');
    const servicesGrid = document.getElementById('services-grid');
    
    if (services.length === 0) {
        servicesGrid.innerHTML = `
            <div class="no-services">
                <i class="fas fa-plus-circle"></i>
                <h3>No services yet</h3>
                <p>Start by adding your first service to attract customers</p>
                <button class="btn btn-primary" onclick="showDashboardSection('add-service')">Add Service</button>
            </div>
        `;
        return;
    }
    
    servicesGrid.innerHTML = services.map(service => `
        <div class="service-card">
            <div class="service-images">
                <img src="${service.images[0] ? URL.createObjectURL(service.images[0]) : 'placeholder.jpg'}" alt="${service.name}">
            </div>
            <div class="service-info">
                <h3>${service.name}</h3>
                <p class="service-category">${service.category}</p>
                <p class="service-price">₹${service.price}</p>
                <p class="service-location">${service.location}</p>
                <div class="service-actions">
                    <button class="btn btn-secondary btn-sm">Edit</button>
                    <button class="btn btn-outline btn-sm">View</button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterBookings() {
    const status = document.getElementById('booking-status-filter').value;
    // In real app, this would filter bookings from API
    showNotification(`Filtering bookings by: ${status}`, 'info');
}

// Global functions for onclick handlers
function showAddServiceForm() {
    showDashboardSection('add-service');
}

function resetServiceForm() {
    document.getElementById('add-service-form').reset();
    document.getElementById('image-preview').innerHTML = '';
}
