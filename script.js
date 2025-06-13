import { isAuthenticated, TOKEN_KEY } from './login.js';
import { getProfile } from './profile.js';

const token = localStorage.getItem(TOKEN_KEY);
if (token && isAuthenticated()) {
  getProfile();
  const loading = document.getElementById('loading');
  if (loading) {
    loading.style.display = 'none';
  }
} 

const logout = document.getElementById('logoutBtn');
if (logout) {
  logout.addEventListener('click', () => {
    window.location.href = 'login.html';
    localStorage.removeItem(TOKEN_KEY);
  });
}
