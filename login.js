const API_SIGNIN = 'https://learn.zone01kisumu.ke/api/auth/signin';

export const TOKEN_KEY = 'zone01_token';

export async function login(id, password) {
  try {
    const basicAuth = btoa(`${id}:${password}`);
    const res = await fetch(API_SIGNIN, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Invalid credentials');
    }

    let token = await res.text(); // Get token as text
    
    // Clean the token - remove any whitespace, quotes, or extra characters
    token = token.trim().replace(/^["']|["']$/g, '');

    // Validate token format before returning
    if (token && token.includes('.')) {
      const parts = token.split('.');
      
      if (parts.length === 3) {
        try {
          // Test if we can decode the header and payload
          const header = JSON.parse(atob(parts[0]));
          const payload = JSON.parse(atob(parts[1]));

        } catch (decodeError) {
          console.error('Token decode test failed:', decodeError);
          throw new Error('Received invalid JWT token format');
        }
      } else {
        throw new Error('Invalid JWT structure - expected 3 parts');
      }
    } else {
      throw new Error('Invalid token format received');
    }
    
    return token;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function handleLoginSubmit(e) {
  e.preventDefault();

  const id = document.getElementById('id').value;
  const password = document.getElementById('password').value;

  // Clear previous errors
  const errorElement = document.getElementById('error');
  if (errorElement) {
    errorElement.textContent = '';
  }

  try {
    const token = await login(id, password);
    
    // Store token in localStorage (consistent with your current approach)
    localStorage.setItem(TOKEN_KEY, token);
    
    window.location.href = 'index.html';
  } catch (err) {
    console.error('Login submission error:', err);
    if (errorElement) {
      errorElement.textContent = err.message || 'Login failed';
    }
  }
}
