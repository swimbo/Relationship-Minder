(function (arguments) {

  //======================================================//
  // Declare the module
  //======================================================//
angular.module('relationshipMinder', ['ngAnimate', 'ui.router'])
//   // =======================================================//
//   // Declare the factory
//   // =======================================================//
// angular.module('relationshipMinder')
//       .factory('contactFactory', contactFactory)
  // =======================================================//
  // Declare our controller for the webapp flow
  // =======================================================//
angular.module('relationshipMinder')
        .controller('RelationshipMinderController', RelationshipMinderController)

var contactList = [('jack','doe','test1@gmail.com'),('jo','smith','test2@gmail.com')]


// // this factory stores data outside of the controller(s)
// function contactFactory(){
//     var contactList = [ ]
//     return(contactList)
//   }

function RelationshipMinderController (){
  var rmCont = this

  //object constructor to create new contact objects based on API connections and/or front-end clicks/actions
  function contactItem(firstName, lastName, email, bucket, lastContact, overdue, daysOverdue) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.bucket = bucket;
      this.lastContact = lastContact;
      this.overdue = overdue;
      this.daysOverdue = daysOverdue;
  }

  // factory to turn our contacts into objects with durations
  function contactBucket(){
    console.log(contactList.name);
  }
contactBucket()
}




  //======================================================//
  //Configure our routes
  //======================================================//
  angular.module('relationshipMinder')
    .config(function($stateProvider, $urlRouterProvider) {

      // catch all route
      // send users to the landing page

      $stateProvider
      // Route to show the landing page
      .state('landing', {
            url: '/landing',
            templateUrl: 'landing.html'
        })
      // Route to show the first page
      .state('getting-started', {
            url: '/getting-started',
            templateUrl: 'getting-started.html'
        })
        // nested states
        // each of these sections will have their own view
        // url will be nested (/getting-started/connect)
       .state('connect', {
           url: '/connect',
           templateUrl: 'connect.html'
       })

       // url will be /getting-started/buckets
       .state('buckets', {
           url: '/buckets',
           templateUrl: 'buckets.html'
       })

       // url will be /getting-started/notifications
       .state('notifications', {
           url: '/notifications',
           templateUrl: 'notifications.html'
       })

       // url will be /activity-feed.html
       .state('activity-feed', {
           url: '/activity-feed',
           templateUrl: 'activity-feed.html'
       });

       $urlRouterProvider.otherwise('/landing');
    })


})();
