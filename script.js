import { isAuthenticated, TOKEN_KEY } from './login.js';
import { getProfile } from './profile.js';

const token = localStorage.getItem(TOKEN_KEY);
if (token && isAuthenticated()) {
  getProfile();
} else {
  window.location.href = 'login.html';
}


export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = 'login.html';
}
