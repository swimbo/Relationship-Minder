(function(arguments) {

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

  // the raw array I get back from google People API
  var googList = []

  function RelationshipMinderController() {
    var rmCont = this

    //object constructor to create contact objects based on API connections and/or front-end clicks/actions
    function contactItem(firstName, lastName, email, bucket, lastContact, overdue, daysOverdue) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.bucket = bucket;
      this.lastContact = lastContact;
      this.overdue = overdue;
      this.daysOverdue = daysOverdue;
    }


    //this function will create a simulated return from the google API by filling the array with objects
    function googListFiller(){
      for (var i = 0; i<9; i++){
        googList.push(contactItem('firstName'+i,'lastName'+i,'email'+ i + '@gmail.com'))
      }

      console.log(googList)
    }
  googListFiller()
    // this factory stores data outside of the controller(s)
    // function contactFactory() {
    //   var googList = []
    //   return (googList)
    // }

    // this function will create and push new contact objects to the contactList array
    rmCont.contactPush = function () {
      var firstNameArray = []
      for (var i = 0; i < googList.length; i++) {
        var firstNameArray = rmCont.googList[i].firstName.push()
        console.log(firstNameArray);
      }

    }


    rmCont.contact1 = new contactItem('Jim', 'Booth', 'test1@gmail.com')



    //  Function to push a plate onto the order array when button is clicked
    // RC.addPlate = function(plate){
    //   RC.No1.orderArray.push(plate)
    // }

    //this function is going to add connect to the API and add the contacts to the contactList array
    // function contactBucket(){
    //
    //   console.log(contactList.name);
    // }



    //this function is going to add the bucket information to the contact objects
    function contactBucket() {

      console.log(contactList.name);
    }

    //this function is going to set the preferred notification type by... BUCKET?
    function notificationType() {

      console.log(contactList.name);
    }

    //this function is going to create an notificationArray of all the contacts who are overdue by filtering the array
    function createNotificationArray() {

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
