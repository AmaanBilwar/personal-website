const clientId = 'test';
const clientSecret = 'test2';
const code = 'test3';
const redirectUri = 'http://127.0.0.1:3000/callback';

const basic = btoa(clientId + ':' + clientSecret);

fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    'Authorization': 'Basic ' + basic,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
  }),
})
.then(response => response.json())
.then(data => {
  console.log('Your refresh token is:', data.refresh_token);
  console.log('Full response:', data);
})
.catch(error => console.error('Error:', error));