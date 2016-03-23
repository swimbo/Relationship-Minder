<!--Add a button for the user to click to initiate auth sequence -->
<button id="authorize-button" style="visibility: hidden">Authorize</button>
<script type="text/javascript">

  var clientId = '199009851105-j9aosg5ru9knh1rje5acp0qav5s5ant5.apps.googleusercontent.com';

  var scopes = 'https://www.googleapis.com/auth/plus.me';

  function handleClientLoad() {
    // Step 2: Reference the API key
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth,1);
  }

  function checkAuth() {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
  }

  function handleAuthResult(authResult) {
    var authorizeButton = document.getElementById('authorize-button');
    if (authResult && !authResult.error) {
      authorizeButton.style.visibility = 'hidden';
      makeApiCall();
    } else {
      authorizeButton.style.visibility = '';
      authorizeButton.onclick = handleAuthClick;
    }
  }

  function handleAuthClick(event) {
    // Step 3: get authorization to use private data
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
    return false;
  }

  // Load the API and make an API call.  Display the results on the screen.
  function makeApiCall() {
    // Step 4: Load the Google+ API
    gapi.client.load('plus', 'v1').then(function() {
      // Step 5: Assemble the API request
      var request = gapi.client.plus.people.get({
        'userId': 'me'
      });
      // Step 6: Execute the API request
      request.then(function(resp) {
        var heading = document.createElement('h4');
        var image = document.createElement('img');
        image.src = resp.result.image.url;
        heading.appendChild(image);
        heading.appendChild(document.createTextNode(resp.result.displayName));

        document.getElementById('content').appendChild(heading);
      }, function(reason) {
        console.log('Error: ' + reason.result.error.message);
      });
    });
  }
</script>
// Step 1: Load JavaScript client library
<script src="https://apis.google.com/js/client.js?onload=handleClientLoad"></script>



{"web":{"client_id":"199009851105-j9aosg5ru9knh1rje5acp0qav5s5ant5.apps.googleusercontent.com","project_id":"relationship-minder","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://accounts.google.com/o/oauth2/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"v3xdvpOun7qADaLOO7cY_cHK"}}
