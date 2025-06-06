const API_SIGNIN = 'https://learn.zone01kisumu.ke/api/auth/signin';
const TOKEN_KEY = 'zone01_token';

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('id').value;
  const password = document.getElementById('password').value;

  const basicAuth = btoa(`${id}:${password}`);

  try {
    const res = await fetch(API_SIGNIN, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
      },
    });

    if (!res.ok) throw new Error('Invalid credentials');

    const token = await res.text();
    localStorage.setItem(TOKEN_KEY, token);
    window.location.href = 'index.html';
  } catch (err) {
    document.getElementById('error').textContent = err.message;
  }
});
