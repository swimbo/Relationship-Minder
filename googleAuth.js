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



// code taken from another project as a basis for API access
function googlePeopleAPIcontroller($http){
  var GoogAPI = this

  $http.get('https://accounts.google.com/o/oauth2/v2/auth?client_id=199009851105-j9aosg5ru9knh1rje5acp0qav5s5ant5.apps.googleusercontent.com&response_type=token&redirect_uri=https://thekidgarage.com/membership/&scope=email%20profile', {cache: true})
    .then(function(response){
      console.log(response.data)
    })
}
googlePeopleAPIcontroller()


//people.people.connections.list	Google People API v1	Provides a list of the authenticated user's contacts merged with any linked profiles.


// other versions i found: 

function gPOnLoad(){
     // G+ api loaded
     document.getElementById('gp_login').style.display = 'block';
}
vmRMCtrl.googleAuth = function() {
    gapi.auth.signIn({
        callback: gPSignInCallback,
        clientid: googleKey,
        cookiepolicy: "single_host_origin",
        requestvisibleactions: "http://schema.org/AddAction",
        scope: "https://www.googleapis.com/auth/plus.login email"
    })
}

function gPSignInCallback(e) {
    if (e["status"]["signed_in"]) {
        gapi.client.load("plus", "v1", function() {
            if (e["access_token"]) {
                getProfile()
            } else if (e["error"]) {
                console.log("There was an error: " + e["error"])
            }
        })
    } else {
        console.log("Sign-in state: " + e["error"])
    }
}

function getProfile() {
    var e = gapi.client.plus.people.get({
        userId: "me"
    });
    e.execute(function(e) {
        if (e.error) {
            console.log(e.message);
            return
        } else if (e.id) {
            // save profile data
        }
    })
}(function() {
    var e = document.createElement("script");
    e.type = "text/javascript";
    e.async = true;
    e.src = "https://apis.google.com/js/client:platform.js?onload=gPOnLoad";
    var t = document.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(e, t)
})()



vmRMCtrl.googlePeopleAPIcontroller($http){
  var GoogAPI = this

  $http.get('https://accounts.google.com/o/oauth2/v2/auth?client_id=199009851105-j9aosg5ru9knh1rje5acp0qav5s5ant5.apps.googleusercontent.com&response_type=token&redirect_uri=https://thekidgarage.com/membership/&scope=email%20profile', {cache: true})
    .then(function(response){
      console.log(response.data)
    })
}
