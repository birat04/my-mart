// Login Handler
const loginForm = document.getElementById('login-form');
loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('authToken', data.token); // Store token
            alert('Login successful!');
            window.location.href = 'index.html'; // Redirect to homepage
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Error logging in');
    }
});

// Signup Handler
const signupForm = document.getElementById('signup-form');
signupForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Signup successful! Please login.');
            window.location.href = 'login.html'; // Redirect to login
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Error signing up');
    }
});
