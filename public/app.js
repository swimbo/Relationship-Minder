(function(arguments) {

  //======================================================//
  // Declare the module
  //======================================================//
  angular.module('RelationshipMinder', ['myControllers','ui.router','myFactory'])


  // =======================================================//
  // Declare our controller for the webapp flow
  // =======================================================//
  angular.module('RelationshipMinder')
    .controller('RelationshipMinderController', RelationshipMinderController)

    RelationshipMinderController.$inject = ['$http']

  function RelationshipMinderController($http) {
    var vmRMCtrl = this
    //placing bindable members at the top for easier readability
    vmRMCtrl.contactItem = contactItem;


// =======================================================//
//   Array Constructor and manipulation in this section
// =======================================================//

    // array constructor to create new contact lists of contact objects
    // function contactArray() {
    //   vmRMCtrl.contactArray = contactArray;
    // }

    //function to create the empty array that google contact objects will reside in
    // vmRMCtrl.googList = new contactArray([])
    // console.log(vmRMCtrl);

    //object constructor to create new contact objects based on API connections and/or front-end clicks/actions
    // function contactItem(firstName, lastName, email, phone, lastContact, bucket, overdue, daysSince) {
    //   this.firstName = firstName;
    //   this.lastName = lastName;
    //   this.email = email;
    //   this.phone = phone;
    //   this.lastContact = lastContact;
    //   this.bucket = bucket;
    //   this.overdue = overdue;
    //   this.daysSince = daysSince;
    // }


    // =======================================================//
    // Contacts Page starts here
    // =======================================================//


    // For todays date (via the datejs library);
    var dateToday = Date.today()
    var dateMilliseconds = dateToday.getTime()
    console.log(dateMilliseconds);

    function overdueAmt(){
      for(var i = 0; i < vmRMCtrl.googList.length; i++){
        var millisecondsOverdue = dateMilliseconds - vmRMCtrl.googList[i].lastContact
        var daysSince = (millisecondsOverdue / 86400000)
        vmRMCtrl.googList[i].daysSince = Math.round(daysSince)

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

    // this function is going to check and see if we have bucketed all of our contacts and, if we have, then return false to disable the button.
    vmRMCtrl.checkBtnStatus = function() {
      if(vmRMCtrl.OnDeck < vmRMCtrl.googList.length){
        return true
      }
      else {
        return false
      }
    }

    //bucketing function on click assign bucket value to appropriate key value pair AND call next one
    function nextContact (){
      vmRMCtrl.checkBtnStatus()
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
        // else{
        //   vmRMCtrl.lastMessage = 'All done! Click the button to see notifications.'
        //   console.log(vmRMCtrl.lastMessage);
        // }

      }

    }
    //this function is going to add the bucket information to the contact objects
    vmRMCtrl.contactBucket = function (bucketValue) {
      vmRMCtrl.googList[vmRMCtrl.OnDeck].bucket = bucketValue
      nextContact()
    }
    nextContact()


    // vmRMCtrl.checkBtnStatus()

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
angular.module('RelationshipMinder')
    .config(routerConfig)
    .directive('repeatDone',repeatDone)


routerConfig.$inject = ['$stateProvider', '$urlRouterProvider']
    // .config(function($stateProvider, $urlRouterProvider) {

      // catch all route
      // send users to the landing page

      // $stateProvider
      // // Route to show the landing page
      //   .state('landing', {
      //     url: 'landing',
      //     templateUrl: 'landing.html'
      //   })
      //   // Route to show the first page
      //   .state('getting-started', {
      //     url: '/getting-started',
      //     templateUrl: 'getting-started.html'
      //   })
      //   // nested states
      //   // each of these sections will have their own view
      //   // url will be nested (/getting-started/connect)
      //   .state('connect', {
      //     url: '/connect',
      //     templateUrl: 'partials/connect.html'
      //   })
      //
      // // url will be /getting-started/buckets
      // .state('buckets', {
      //   url: '/buckets',
      //   templateUrl: 'partials/buckets.html'
      // })
      //
      // // url will be /getting-started/notifications
      // .state('notifications', {
      //   url: '/notifications',
      //   templateUrl: 'partials/notifications.html'
      // })
      //
      // // url will be /activity-feed.html
      // .state('activity-feed', {
      //   url: '/activity-feed',
      //   templateUrl: 'partials/activity-feed.html'
      // });
      //
      // $urlRouterProvider.otherwise('partials/landing');
      // })



  function routerConfig ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/landing',
        templateUrl: 'partials/landing.html',
        // controller: 'clientRMController as rmCtrl'
      })
      .state('getting-started', {
        url: '/getting-started',
        templateUrl: 'partials/getting-started.html',
        // controller: 'clientRMController as rmCtrl'
      })
      .state('connect', {
        url: '/connect',
        templateUrl: 'partials/connect.html',
        // controller: 'clientRMController as rmCtrl'
      })
      .state('buckets', {
        url: '/buckets',
        templateUrl: 'partials/buckets.html',
        // controller: 'clientRMController as rmCtrl'
      })
      .state('activity-feed', {
        url: '/activity-feed',
        templateUrl: 'partials/activity-feed.html',
        // controller: 'clientRMController as rmCtrl'
      })
      $urlRouterProvider.otherwise('/landing')
  }

  function repeatDone (){
    return function(scope, element, attrs) {
        if (scope.$last) { // all are rendered
            scope.$eval(attrs.repeatDone);
        }
    }
  }




})();
