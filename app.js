(function (arguments) {

  //======================================================//
  // Declare the module
  //======================================================//
angular.module('relationshipMinder', ['ngAnimate', 'ui.router'])
  // =======================================================//
  // Declare the factory
  // =======================================================//
  // angular.module('relationshipMinder')
  //       .factory('contactFactory', contactFactory)

  // =======================================================//
  // Declare our controller for the webapp flow
  // =======================================================//
angular.module('relationshipMinder')
        .controller('RelationshipMinderController', RelationshipMinderController)

var contactList = [('jack','doe','test1@gmail.com'),('jo','smith','test2@gmail.com')]
console.log(contactList);

// // this factory stores data outside of the controller(s)
// function contactFactory(){
//     var contactList = [ ]
//     return(contactList)
//   }

function googlePeopleAPIcontroller($http){
  var GoogAPI = this

  $http.get('https://accounts.google.com/o/oauth2/v2/auth?client_id=199009851105-j9aosg5ru9knh1rje5acp0qav5s5ant5.apps.googleusercontent.com&response_type=token&redirect_uri=https://thekidgarage.com/membership/&scope=email%20profile', {cache: true})
    .then(function(response){
      console.log(response.data)
    })
}
googlePeopleAPIcontroller()



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

  // this function will create and push new contact objects to the contactList array
  function contactPush (){
    rmCont.contactList.push()
  }

  //this function is going to add connect to the API and add the contacts to the contactList array
  // function contactBucket(){
  //
  //   console.log(contactList.name);
  // }



  //this function is going to add the bucket information to the contact objects
  function contactBucket(){

    console.log(contactList.name);
  }

  //this function is going to set the preferred notification type by... BUCKET?
  function notificationType(){

    console.log(contactList.name);
  }

  //this function is going to create an notificationArray of all the contacts who are overdue by filtering the array
  function createNotificationArray(){

    console.log(contactList.name);
  }

  //this function is going to add the number of days overdue to the alertArray
  // function (){
  //
  //   console.log(contactList.name);
  // }


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
