import { handleLoginSubmit, TOKEN_KEY } from './login.js';
import { user } from './model.js';

let loadedDoc = window.location.pathname.split('/').pop();

if (loadedDoc === 'login.html') {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }
} else {
  // Check if user is authenticated before trying to get user name
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    getUserName();
    console.log("User is authenticated. Token found.");
  } else {
    console.log("No authentication token found.");
    // Redirect to login if no token
    window.location.href = 'login.html';
  }
}

function getUserName() {
  const usee_name = document.getElementById('usee_name');
  if (!usee_name) return;

  const token = localStorage.getItem(TOKEN_KEY);
  
  if (token) {
    try {
      // Clean and decode JWT payload
      const cleanToken = token.trim().replace(/^["']|["']$/g, '');
      const parts = cleanToken.split('.');
      
      if (parts.length === 3) {
        // Handle base64url decoding properly
        let payload = parts[1];
        // Add padding if needed
        while (payload.length % 4) {
          payload += '=';
        }
        // Convert base64url to base64
        payload = payload.replace(/-/g, '+').replace(/_/g, '/');
        
        const decodedPayload = JSON.parse(atob(payload));
        console.log('Decoded token payload:', decodedPayload);
        
        usee_name.innerText = decodedPayload.name || decodedPayload.email || decodedPayload.login || decodedPayload.sub || 'User';
      } else {
        usee_name.textContent = 'User';
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      usee_name.textContent = 'User';
    }
  } else {
    usee_name.textContent = 'Guest';
  }

  // Use data from the API call
  console.log('User ID:', user.id);
  console.log('User Login:', user.login);
  
  // If we have user data from API, use that instead
  if (user.login && user.login !== 'Guest') {
    usee_name.innerText = user.login;
  }
}

// Utility function to check if user is authenticated
export function isAuthenticated() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return false;
  
  try {
    // Clean the token
    const cleanToken = token.trim().replace(/^["']|["']$/g, '');
    const parts = cleanToken.split('.');
    
    if (parts.length !== 3) return false;
    
    // Handle base64url decoding properly
    let payload = parts[1];
    // Add padding if needed
    while (payload.length % 4) {
      payload += '=';
    }
    // Convert base64url to base64
    payload = payload.replace(/-/g, '+').replace(/_/g, '/');
    
    const decodedPayload = JSON.parse(atob(payload));
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (decodedPayload.exp && decodedPayload.exp < currentTime) {
      localStorage.removeItem(TOKEN_KEY);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error validating token:', error);
    localStorage.removeItem(TOKEN_KEY);
    return false;
  }
}

// Utility function to logout
export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = 'login.html';
}
