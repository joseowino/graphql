import {  handleLoginSubmit } from './login.js'

const TOKEN_KEY = 'zone01_token';

let loadedDoc = window.location.pathname.split('/').pop()

if (loadedDoc === 'login.html') {
    let loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLoginSubmit);
} else {
    getUserName();
}

function getUserName() {
    let usee_name = document.getElementById('usee_name');
    let token = localStorage.getItem('TOKEN_KEY') || localStorage.getItem(TOKEN_KEY);

    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        usee_name.innerText = payload.name || payload.email || 'User';
    } else {
        usee_name.textContent = 'Guest';
    }
}

