import { isAuthenticated, TOKEN_KEY } from './login.js';
import { getProfile } from './profile.js';
import { user } from './model.js';

const token = localStorage.getItem(TOKEN_KEY);

if (token && isAuthenticated()) {
  if (!user) {
    console.error('User data is not available.');
  } else {
    getProfile(user);
    const loading = document.getElementById('loading');
    if (loading) {
      loading.style.display = 'none';
    }
  }
}

const logout = document.getElementById('logoutBtn');
if (logout) {
  logout.addEventListener('click', () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = 'login.html';
  });
}
