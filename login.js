const API_SIGNIN = 'https://learn.zone01kisumu.ke/api/auth/signin';
export const TOKEN_KEY = 'zone01_token';

const loginForm = document.getElementById('loginForm');

export async function handleLoginSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('id').value; //Name or email
  const password = document.getElementById('password').value;

  try {
    const token = await login(id, password);
    localStorage.setItem(TOKEN_KEY, token);
    window.location.href = 'index.html';
  } catch (err) {
    document.getElementById('error').textContent = err.message;
  }
}

async function login(id, password) {
  const basicAuth = btoa(`${id}:${password}`);

  const res = await fetch(API_SIGNIN, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
    },
  });

  if (!res.ok) throw new Error('Invalid credentials');

  console.log('Login successful');
  console.log('Response:', res.text);

  return res.text(); // Returns the token
}

