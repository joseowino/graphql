import { TOKEN_KEY } from "./login.js";

const endpoint = "https://learn.zone01kisumu.ke/api/graphql-engine/v1/graphql";

const query = `
  query {
    event(where: { id: { _eq: 75 } }) {
      object {
        attrs
      }
    }
    user {
      id
      profile
      campus
      login
      firstName
      lastName
      email
      attrs
      results(order_by: { grade: desc }, limit: 5) {
        object {
          name
        }
        grade
      }
      transactions(where: { type: { _eq: "xp" } }) {
        amount
      }
      events(where: { eventId: { _eq: 75 } }) {
        level
      }
      xpHistory: transactions(
        where: {
          _and: [
            { eventId: { _eq: 75 } },
            { type: { _eq: "xp" } }
          ]
        }
        order_by: { createdAt: asc }
      ) {
        amount
        createdAt
      }
      totalXP: transactions(
        where: { eventId: { _eq: 75 } },
        order_by: { createdAt: asc }
      ) {
        object {
          name
          attrs
          type
        }
        amount
        createdAt
        eventId
        path
        type
      }
      upTransactions: transactions(where: { type: { _eq: "up" } }) {
        amount
      }
      downTransactions: transactions(where: { type: { _eq: "down" } }) {
        amount
      }
      xpTimeline: transactions(
        where: { type: { _eq: "xp" } }
        order_by: { createdAt: asc }
      ) {
        amount
        createdAt
      }
      skillTypes: transactions_aggregate(
        distinct_on: [type]
        where: { type: { _nin: ["xp", "level", "up", "down"] } }
        order_by: [{ type: asc }, { amount: desc }]
      ) {
        nodes {
          type
          amount
        }
      }
    }
  }
`;

function getAuthToken() {
  // Try localStorage first (your current approach)
  let token = localStorage.getItem(TOKEN_KEY);
  
  if (!token) {
    console.warn('No authentication token found');
    return null;
  }

  // Clean the token - remove any whitespace, quotes, or extra characters
  token = token.trim().replace(/^["']|["']$/g, '');
  
  // Basic JWT format validation
  const parts = token.split(".");
  if (parts.length !== 3) {
    console.warn('Invalid JWT format detected - parts:', parts.length);
    localStorage.removeItem(TOKEN_KEY); // Clear invalid token
    return null;
  }

  // Test if parts are valid base64url
  try {
    for (let i = 0; i < 2; i++) { // Only test header and payload, signature might use different encoding
      const decoded = atob(parts[i].replace(/-/g, '+').replace(/_/g, '/'));
      JSON.parse(decoded);
    }

  } catch (validationError) {
    console.error('Token validation failed:', validationError);
    console.error('Problematic token part:', parts.find((part, index) => {
      try {
        if (index < 2) {
          atob(part.replace(/-/g, '+').replace(/_/g, '/'));
        }
        return false;
      } catch {
        return true;
      }
    }));
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }

  return token;
}

export async function schema() {
  if (window.location.href !== 'http://127.0.0.1:5500/index.html') {
    return;
  }

  try {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error("Authentication token is missing. Please log in.");
    }
    
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Fixed: Added backticks for template literal
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Clear invalid token
        localStorage.removeItem(TOKEN_KEY);
        throw new Error("Session expired. Please log in again.");
      }

      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors && result.errors.length > 0) {
      console.error("GraphQL errors:", result.errors);
      
      // Check if it's an authentication error
      const authError = result.errors.find(error => 
        error.message.includes('Authentication') || 
        error.message.includes('unauthorized') ||
        error.extensions?.code === 'access-denied'
      );
      
      if (authError) {
        localStorage.removeItem(TOKEN_KEY);
        throw new Error("Authentication failed. Please log in again.");
      }
      
      throw new Error(result.errors[0].message || "GraphQL query failed");
    }

    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    
    // Only show alert in browser environment
    if (typeof window !== 'undefined' && window.alert) {
      alert(error.message || "An error occurred while fetching data.");
    }
    
    // Don't return undefined - return null or throw
    throw error;
  }
}
