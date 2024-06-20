import { register } from './api.js';

document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await register({ username, email, password });
        document.getElementById('register-status').textContent = response.message;

        if (response.success) {
            window.location.href = '/login.html';
        }
    } catch (error) {
        document.getElementById('register-status').textContent = error.message;
    }
});
