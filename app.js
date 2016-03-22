(function (arguments) {

  //======================================================//
  // Declare the module
  //======================================================//
angular.module('relationshipMinder', [])
  // =======================================================//
  // Declare the factory
  // =======================================================//
angular.module('relationshipMinder')
      .factory('contactFactory', contactFactory)
  // =======================================================//
  // Declare our controller for the webapp flow
  // =======================================================//
angular.module('relationshipMinder')
        .controller('rmController', rmController)

var contactList = []
console.log(contactList);

// this factory stores data outside of the controller(s)
function contactFactory(){
    contactList.push(('bo', 'bergstrom', 'bo.bergstrom@gmail.com'))
    return(contactList)
  }
console.log(contactList);

function rmController (){
  var rmCont = this

  //object constructor to create new contact objects based on API connections and/or front-end clicks/actions
  function contactItem(firstName, lastName, email, bucket, lastContact) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.bucket = bucket;
      this.lastContact = lastContact;
  }

  // factory to turn our contacts into objects with durations
  function contactBucket(){

    console.log(contactList);
  }





}




  //======================================================//
  // Configure our routes
  //======================================================//
    // .config(function($stateProvider, $urlRouterProvider) {
    //
    //   $stateProvider
    //
    //   // Route to show the first page
    //
    //   .state('getting-started', {
    //         url: '/getting-started',
    //         templateUrl: 'getting-started.html',
    //         controller: 'rmController as rmControl'
    //     })
    //     // nested states
    //     // each of these sections will have their own view
    //     // url will be nested (/getting-started/connect)
    //    .state('getting-started.connect', {
    //        url: '/connect',
    //        templateUrl: 'connect.html'
    //    })
    //
    //    // url will be /getting-started/buckets
    //    .state('getting-started.buckets', {
    //        url: '/buckets',
    //        templateUrl: 'buckets.html'
    //    })
    //
    //    // url will be /getting-started/notifications
    //    .state('getting-started.notifications', {
    //        url: '/notifications',
    //        templateUrl: 'notifications.html'
    //    });
    //
    //        // catch all route
    //        // send users to the form page
    //        $urlRouterProvider.otherwise('/getting-started');
    //    })


})();
