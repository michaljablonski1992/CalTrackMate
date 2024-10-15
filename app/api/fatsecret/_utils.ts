// This will hold our token and expiration time in memory
let accessToken: string | null = null;
let tokenExpiration: number | null = null;

async function requestNewAccessToken() {
  const clientID = process.env.FATSECRET_CLIENT_ID;
  const clientSecret = process.env.FATSECRET_CLIENT_SECRET_KEY;

  // Encode client ID and secret for Basic Authorization
  const credentials = Buffer.from(`${clientID}:${clientSecret}`).toString('base64');

  // Prepare URL-encoded form data
  const formData = new URLSearchParams({
    'grant_type': 'client_credentials',
    'scope': 'basic',
  });

  // Send request to the OAuth token endpoint
  const response = await fetch('https://oauth.fatsecret.com/connect/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`, // Basic authentication
      'Content-Type': 'application/x-www-form-urlencoded', // URL-encoded content type
    },
    body: formData.toString(), // URL-encoded form data
  });

  if (!response.ok) {
    throw new Error('Failed to obtain access token');
  }

  // Parse and return the response
  const data = await response.json();
  accessToken = data.access_token;
  tokenExpiration = Date.now() + data.expires_in * 1000; // Store expiration time in ms
  return accessToken;
}

export async function getAccessToken() {
  // If there's no token or it has expired, request a new one
  if (!accessToken || (tokenExpiration && Date.now() >= tokenExpiration)) {
    return await requestNewAccessToken();
  } else {
    return new Promise(resolve => resolve(accessToken));
  }
}