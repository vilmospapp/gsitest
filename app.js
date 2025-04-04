// Handle the Google Sign-In response
function handleCredentialResponse(response) {
    // Parse the JWT token
    const responsePayload = parseJwt(response.credential);
    
    // Save user info to session storage
    sessionStorage.setItem('userEmail', responsePayload.email);
    sessionStorage.setItem('userName', responsePayload.name);
    sessionStorage.setItem('userPicture', responsePayload.picture);
    sessionStorage.setItem('userToken', response.credential);
    
    // Show authenticated content
    showAuthenticatedContent();
  }
  
  // Helper function to parse JWT
  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }
  
  // Display authenticated content
  function showAuthenticatedContent() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('appContent').style.display = 'block';
    document.getElementById('userName').textContent = sessionStorage.getItem('userName');
  }
  
  // Check if user is already authenticated
  window.onload = function() {
    if (sessionStorage.getItem('userToken')) {
      showAuthenticatedContent();
    }
    
    document.getElementById('logoutBtn').addEventListener('click', function() {
      // Clear session storage
      sessionStorage.clear();
      // Redirect to home
      window.location.href = '/';
    });
  }