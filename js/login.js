import { login } from './api.js';

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const data = await login({ username, password });
        if (data.token) {
            window.location.href = '/index.html';
        } else {
            alert('Inloggen mislukt: ' + data.message);
        }
    } catch (error) {
        alert('Er is een fout opgetreden: ' + error.message);
    }
});