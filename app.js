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
    function contactItem(firstName, lastName, email, lastContact, bucket, overdue, daysOverdue) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.lastContact = lastContact;
      this.bucket = bucket;
      this.overdue = overdue;
      this.daysOverdue = daysOverdue;
    }

    //fake contacts for testing
    var contact1 = new contactItem('firstname1', 'lastname1', 'test1@gmail.com', "2015-12-05")
    var contact2 = new contactItem('firstname2', 'lastname2', 'test2@gmail.com', "2015-03-05")
    var contact3 = new contactItem('firstname3', 'lastname3', 'test3@gmail.com', "2016-02-05")
    var contact4 = new contactItem('firstname4', 'lastname4', 'test4@gmail.com', "2016-03-05")
    var contact5 = new contactItem('firstname5', 'lastname5', 'test5@gmail.com', "2014-12-05")

    //fake array for testing
    vmRMCtrl.googList = [contact1, contact2, contact3, contact4, contact5]
    console.log(vmRMCtrl.googList[0].firstName);

    // =======================================================//
    // Contacts Page starts here
    // =======================================================//
//
// formattedTime = function(formatString){
//   var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
//   YY = ((YYYY=this.getFullYear())+"").slice(-2);
//   MM = (M=this.getMonth()+1)<10?('0'+M):M;
//   MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
//   DD = (D=this.getDate())<10?('0'+D):D;
//   DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
//   th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
//   formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
//   h=(hhh=this.getHours());
//   if (h==0) h=24;
//   if (h>12) h-=12;
//   hh = h<10?('0'+h):h;
//   hhhh = h<10?('0'+hhh):hhh;
//   AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
//   mm=(m=this.getMinutes())<10?('0'+m):m;
//   ss=(s=this.getSeconds())<10?('0'+s):s;
//   return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
// };
//
// var now = new Date;
// console.log( now.formattedTime( "#DD#/#MM#/#YYYY# #hh#:#mm#:#ss#" ) );
//
//
//   customformat(1294862756114)

function overdueCalc(lastContact){
  var dateArray = vmRMCtrl.googList[0].lastContact.split("-")
  console.log(dateArray);
}
overdueCalc()

// vmRMCtrl.googList[vmRMCtrl.OnDeck].overdue = bucketValue

    // =======================================================//
    // Buckets Page starts here
    // =======================================================//

    vmRMCtrl.OnDeck = 0
    // function to check if a given item in the array has a bucket set and then if false return the firstname + lastname of a given object in the array or move to the next if true

    //bucketing function on click assign bucket value to appropriate key value pair AND call next one
    function nextContact (){
      if (vmRMCtrl.googList[vmRMCtrl.OnDeck].bucket){
        vmRMCtrl.OnDeck++
        if(vmRMCtrl.OnDeck < vmRMCtrl.googList.length){
            nextContact()
        }

      }

    }
    //this function is going to add the bucket information to the contact objects
    vmRMCtrl.contactBucket = function (bucketValue) {
      console.log(vmRMCtrl.googList[vmRMCtrl.OnDeck-1]);
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
