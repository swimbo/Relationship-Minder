(function(arguments) {

  //======================================================//
  // Declare the module
  //======================================================//
  angular.module('relationshipMinder', ['ngAnimate', 'ui.router'])
  // // =======================================================//
  // // Declare the factory
  // // =======================================================//
  // angular.module('relationshipMinder')
  //         .factory('contactFactory', contactFactory)
  //
  // =======================================================//
  // Declare our controller for the webapp flow
  // =======================================================//
  angular.module('relationshipMinder')
    .controller('RelationshipMinderController', RelationshipMinderController)

  // =======================================================//
  // this factory stores data outside of the controller(s)
  // =======================================================//

    // function contactFactory() {
    //   var googList = []
    //   return (googList)
    // }

  function RelationshipMinderController() {
    var vmRMCtrl = this
    //placing bindable members at the top for easier readability
    vmRMCtrl.contactItem = contactItem;


    // array constructor to create new contact lists of contact objects
    function contactArray() {
      vmRMCtrl.contactArray = contactArray;
    }

    //function to create the empty array that google contact objects will reside in
    vmRMCtrl.googList = new contactArray([])
    console.log(vmRMCtrl);

    //object constructor to create new contact objects based on API connections and/or front-end clicks/actions
    function contactItem(firstName, lastName, email, lastContact, bucket, overdue, daysSince) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.lastContact = lastContact;
      this.bucket = bucket;
      this.overdue = overdue;
      this.daysSince = daysSince;
    }


    // =======================================================//
    // Contacts Page starts here
    // =======================================================//
    //fake contacts for testing. To be replaced by Google API data
    var contact1 = new contactItem('firstname1', 'lastname1', 'test1@gmail.com', 1332302400000)
    var contact2 = new contactItem('firstname2', 'lastname2', 'test2@gmail.com', 1294862756114)
    var contact3 = new contactItem('firstname3', 'lastname3', 'test3@gmail.com',  878404500000)
    var contact4 = new contactItem('firstname4', 'lastname4', 'test4@gmail.com', 1332302400000)
    var contact5 = new contactItem('firstname5', 'lastname5', 'test5@gmail.com', 1458799200000)

    //fake array for testing.
    vmRMCtrl.googList = [contact1, contact2, contact3, contact4, contact5]
    console.log(vmRMCtrl.googList[0].firstName);

    // For todays date (via the datejs library);
    var dateToday = Date.today()
    var dateMilliseconds = dateToday.getTime()

    function overdueAmt(){
      for(var i = 0; i < vmRMCtrl.googList.length; i++){
        var millisecondsOverdue = dateMilliseconds - vmRMCtrl.googList[i].lastContact
        var daysSince = (millisecondsOverdue / 86400000)
        vmRMCtrl.googList[i].daysSince = Math.round(daysSince)
// ***** I need to add something in here (maybe?) so that WHEN there are no more contacts they are prompted to click the button.

      }

    }
    // To simulate loading contacts, I should call this after click of "add contacts" and google auth. Putting here for now.
    overdueAmt()


//

    // =======================================================//
    // Buckets Page starts here
    // =======================================================//

    vmRMCtrl.OnDeck = 0
    // function to check if a given item in the array has a bucket set and then if false return the firstname + lastname of a given object in the array or move to the next if true

    //bucketing function on click assign bucket value to appropriate key value pair AND call next one
    function nextContact (){
      if (vmRMCtrl.googList[vmRMCtrl.OnDeck].bucket){
        console.log(vmRMCtrl.googList[vmRMCtrl.OnDeck])
        // this checks if bucket date is greater than days since last contact and sets overdue to true/false based on that check
        if(vmRMCtrl.googList[vmRMCtrl.OnDeck].daysSince <= vmRMCtrl.googList[vmRMCtrl.OnDeck].bucket){
          vmRMCtrl.googList[vmRMCtrl.OnDeck].overdue = false
        }
        else{
          vmRMCtrl.googList[vmRMCtrl.OnDeck].overdue = true
        }
        if(vmRMCtrl.OnDeck < vmRMCtrl.googList.length){
            vmRMCtrl.OnDeck++
            nextContact()
        }

      }

    }
    //this function is going to add the bucket information to the contact objects
    vmRMCtrl.contactBucket = function (bucketValue) {
      vmRMCtrl.googList[vmRMCtrl.OnDeck].bucket = bucketValue
      nextContact()
    }
    nextContact()

    //this function is going to connect to the API and add the contacts to the contactList array
    // function contactBucket(){
    //
    //   console.log(contactList.name);
    // }

    // //this function is going to set the preferred notification type by... BUCKET?
    // function notificationType() {
    //
    //   console.log(contactList.name);
    // }
    //
    // =======================================================//
    // Notification Page logic starts here
    // =======================================================//

    // this function is going to create an notificationArray of all the contacts who are overdue by filtering the array
    // function createNotificationArray() {
    //
    //   console.log(contactList.name);
    // }

    //this function is going to add the number of days overdue to the alertArray
  //   function (){
  //
  //     console.log(contactList.name);
  //   }
  //
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
