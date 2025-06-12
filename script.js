import { handleLoginSubmit, TOKEN_KEY } from './login.js';
import { user } from './model.js';

const loadedDoc = window.location.pathname.split('/').pop();

if (loadedDoc === 'login.html') {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }
} else {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token && isAuthenticated()) {
    getUserName();
  } else {
    window.location.href = 'login.html';
  }
}

function getUserName() {
  const user_name = document.getElementById('usee_name');
  if (!user_name) return;

  if (user && user.login && user.login !== 'Guest') {
    user_name.innerText = user.login;
  } else {
    user_name.innerText = 'Guest';
  }

}

export function isAuthenticated() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return false;

  try {
    const cleanToken = token.trim().replace(/^['"]|['"]$/g, '');
    const [header, payload, signature] = cleanToken.split('.');
    if (!payload) return false;

    let base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    const decoded = JSON.parse(atob(base64));

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      localStorage.removeItem(TOKEN_KEY);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Token parsing error:', err);
    localStorage.removeItem(TOKEN_KEY);
    return false;
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = 'login.html';
}
