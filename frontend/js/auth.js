// API Base URL - Loaded from config.js
// Make sure config.js is loaded before this script in your HTML

// Authentication Helper Functions
class Auth {
    // Store token in localStorage
    static setToken(token) {
        localStorage.setItem('token', token);
    }

    // Get token from localStorage
    static getToken() {
        return localStorage.getItem('token');
    }

    // Remove token from localStorage
    static removeToken() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    // Store user data
    static setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    // Get user data
    static getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    // Check if user is logged in
    static isLoggedIn() {
        return !!this.getToken();
    }

    // Get auth headers for API requests
    static getAuthHeaders() {
        const token = this.getToken();
        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        };
    }

    // Register new user
    static async register(name, email, password, role = 'user') {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, role })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Store token and user data
            this.setToken(data.token);
            this.setUser(data.user);

            return { success: true, user: data.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Login user
    static async login(email, password) {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Store token and user data
            this.setToken(data.token);
            this.setUser(data.user);

            return { success: true, user: data.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Logout user
    static logout() {
        this.removeToken();
        window.location.href = '/index.html';
    }

    // Update UI based on auth state
    static updateUIForAuthState() {
        const user = this.getUser();
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const userNameDisplay = document.getElementById('userNameDisplay');

        if (user) {
            // User is logged in
            if (loginBtn) loginBtn.style.display = 'none';
            if (signupBtn) signupBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'block';
            if (userNameDisplay) {
                userNameDisplay.textContent = `Welcome, ${user.name}`;
                userNameDisplay.style.display = 'block';
            }
        } else {
            // User is not logged in
            if (loginBtn) loginBtn.style.display = 'block';
            if (signupBtn) signupBtn.style.display = 'block';
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (userNameDisplay) userNameDisplay.style.display = 'none';
        }
    }
}

// Show loading spinner
function showLoading(button) {
    button.disabled = true;
    button.dataset.originalText = button.textContent;
    button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
}

// Hide loading spinner
function hideLoading(button) {
    button.disabled = false;
    button.textContent = button.dataset.originalText;
}

// Show error message
function showError(elementId, message) {
    const errorDiv = document.getElementById(elementId);
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        errorDiv.className = 'alert alert-danger mt-3';
    }
}

// Show success message
function showSuccess(elementId, message) {
    const successDiv = document.getElementById(elementId);
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        successDiv.className = 'alert alert-success mt-3';
    }
}

// Clear messages
function clearMessages(elementId) {
    const messageDiv = document.getElementById(elementId);
    if (messageDiv) {
        messageDiv.style.display = 'none';
        messageDiv.textContent = '';
    }
}

// Initialize auth state on page load
document.addEventListener('DOMContentLoaded', function() {
    Auth.updateUIForAuthState();

    // Setup logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            Auth.logout();
        });
    }
});
