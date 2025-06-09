import {  handleLoginSubmit } from './login.js'

let loadedDoc = window.location.pathname.split('/').pop()

if (loadedDoc === 'login.html') {
    let loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLoginSubmit);
}

