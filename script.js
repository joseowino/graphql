import { TOKEN_KEY } from './login.js';
import { getProfile } from './profile.js';

const token = localStorage.getItem(TOKEN_KEY);
if (token && isAuthenticated()) {
  getProfile();
} else {
  window.location.href = 'login.html';
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
