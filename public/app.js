(function(arguments) {

    //======================================================//
    // Declare the module
    //======================================================//
    angular.module('RelationshipMinder', ['myControllers', 'ui.router', 'myFactory'])

    // =======================================================//
    //   Google Auth Controller
    // =======================================================//
    angular.module('RelationshipMinder')
        .controller('GoogleAuthController', GoogleAuthController)

    GoogleAuthController.$inject = ['$http', 'rmFactory']


    function GoogleAuthController($http, rmFactory) {
        console.log('0 - GoogleAuthController start');
        var rmAuth = this
        var clientId = '199009851105-3heb28ouj2tkpa9ao0gbjoda36e77qbb.apps.googleusercontent.com';
        var apiKey = 'Your API Code';
        var scopes = 'https://www.googleapis.com/auth/contacts.readonly';
        var scopes2 = 'https://www.googleapis.com/auth/userinfo.email';

        rmAuth.googleContactsButton = function() {
            console.log('1 - googleContactsButton start');
            gapi.client.setApiKey(apiKey);
            window.setTimeout(rmAuth.authorize);
            console.log('2 - googleContactsButton end');
        };

        rmAuth.authorize = function() {
            console.log('3 - authorize start');
            gapi.auth.authorize({
                client_id: clientId,
                scope: scopes,
                immediate: false
            }, rmAuth.handleAuthorization);
            console.log('4 - authorize end');
        }

        rmAuth.handleAuthorization = function(authorizationResult) {
                console.log('5 - handleAuthorization start');
                if (authorizationResult && !authorizationResult.error) {
                    $http({
                        method: 'GET',
                        url: "https://www.google.com/m8/feeds/contacts/default/thin?alt=json&access_token=" + authorizationResult.access_token + "&max-results=30&v=3.0"
                    }).then(success_callback, error_callback)

                    function success_callback(response) {
                        // See what the raw response looks linked
                        console.log(response);

                        // object constructor to create new contact objects based on API return
                        function contactItem(firstName, lastName, email, phone, socialMedia, postalAddress, lastContact, bucket, overdue, daysSince) {
                            this.firstName = firstName;
                            this.lastName = lastName;
                            this.email = email;
                            this.phone = phone;
                            this.socialMedia = socialMedia;
                            this.postalAddress = postalAddress;
                            this.lastContact = lastContact;
                            this.bucket = bucket;
                            this.overdue = overdue;
                            this.daysSince = daysSince;
                        }

                        // Check for Nulls and Undefined and push to new array if neither is present
                        var rawdata = response.data.feed.entry
                        console.log(rawdata);
                        //
                        function removeNullsandUndefined() {

                            var cleanContactArray = []

                            var firstNameGoog = function(i) {
                                if (response.data.feed.entry[i].gd$name !== undefined && response.data.feed.entry[i].gd$name.gd$givenName !== undefined) {
                                    return response.data.feed.entry[i].gd$name.gd$givenName.$t || 'unknown'
                                }
                            }
                            var lastNameGoog = function(i) {
                                if (response.data.feed.entry[i].gd$name !== undefined && response.data.feed.entry[i].gd$name.gd$familyName !== undefined) {
                                    return response.data.feed.entry[i].gd$name.gd$familyName.$t || 'unknown'
                                }
                            }
                            var emailAddress1Goog = function(i) {
                                if (response.data.feed.entry[i].gd$email !== undefined) {
                                    return response.data.feed.entry[i].gd$email[0].address || 'unknown'
                                }
                            }
                            var phoneNumber1Goog = function(i) {
                                if (response.data.feed.entry[i].gd$phoneNumber !== undefined) {
                                    return response.data.feed.entry[i].gd$phoneNumber[0].$t || 'unknown'
                                }
                            }
                            var socialMediaGoog = function(i) {
                                if (response.data.feed.entry[i].gContact$website !== undefined) {
                                    return response.data.feed.entry[i].gContact$website[0].href || 'unknown'
                                }
                            }
                            var postalAddressGoog = function(i) {
                                if (response.data.feed.entry[i].gd$structuredPostalAddress !== undefined) {
                                    return response.data.feed.entry[i].gd$structuredPostalAddress[0].gd$formattedAddress.$t || 'unknown'
                                }
                            }


                            function cleanContactArrayPusher() {
                                console.log(rawdata);
                                console.log(cleanContactArray)
                                for (var i = 0; i < rawdata.length; i++) {
                                    cleanContactArray.push(
                                        new contactItem(
                                            firstNameGoog(i),
                                            lastNameGoog(i),
                                            emailAddress1Goog(i),
                                            phoneNumber1Goog(i),
                                            socialMediaGoog(i),
                                            postalAddressGoog(i)
                                        )
                                    )
                                }
                                return cleanContactArray
                            }
                            cleanContactArrayPusher()

                            // Our cleanContactArray should now be filled with just the info we want. logging to make sure.
                            console.log(cleanContactArray)


                            // //==========================================================
                            // // Making another call here to grab the user's email address
                            // //==========================================================
                            // function authorize2() {
                            //     console.log('11 - authorize2 start');
                            //       var scopes2 = 'https://www.googleapis.com/auth/userinfo.email';
                            //     gapi.auth.authorize({
                            //         client_id: clientId,
                            //         scope: scopes2,
                            //         immediate: false
                            //     }, rmAuth.handleAuthorization2);
                            //     console.log('12 - authorize2 end');
                            // }
                            // authorize2()
                            //
                            // rmAuth.handleAuthorization2 = function(authorizationResult) {
                            //         console.log('13 - handleAuthorization2 start');
                            //         if (authorizationResult && !authorizationResult.error) {
                            //           var request = gapi.client.plus.people.get({
                            //               'userId' : 'me'
                            //               });
                            //
                            //           request.execute(function(resp) {
                            //           console.log('ID: ' + resp.id);
                            //           console.log('Display Name: ' + resp.displayName);
                            //           console.log('Image URL: ' + resp.image.url);
                            //           console.log('Profile URL: ' + resp.url);
                            //           });
                            //         }
                            //         console.log('16 - handleAuthorization2 end');
                            //   }
                            //   rmAuth.handleAuthorization2()


      //==========================================================
      // Pushing everything in the cleanContactArray to the DB
      //==========================================================

                            function pushCreatetoDB(cleanContactArray) {
                              for (var i = 0; i < rawdata.length; i++) {
                                rmFactory.create(
                                  cleanContactArray[i]
                                )

                              }
                            }
                            pushCreatetoDB(cleanContactArray)
                        }
                        removeNullsandUndefined(rawdata)

                    }

                    function error_callback() {
                        console.log('error on $http call in rmAuth');
                    }
                }
                console.log('6 - original handleAuthorization end');
            }
            //
            // module.exports = {}
            //   rmAuth: {}

    }


    // =======================================================//
    // Declare our controller for the webapp flow
    // =======================================================//
    angular.module('RelationshipMinder')
        .controller('RelationshipMinderController', RelationshipMinderController)

    RelationshipMinderController.$inject = ['rmFactory']

    function RelationshipMinderController(rmFactory) {
        var vmRMCtrl = this
            //placing bindable members at the top for easier readability






        // vmRMCtrl.contactItem = contactItem;


        // =======================================================//
        //   Array Constructor and manipulation in this section
        // =======================================================//
        // console.log(rawGoogleContacts);
        // array constructor to create new contact lists of contact objects
        // function cleanContactArray() {
        //     vmRMCtrl.cleanContactArray = cleanContactArray;
        // }
        //
        // //function to create the empty array that google contact objects will reside in
        // vmRMCtrl.googList = new cleanContactArray([])
        // console.log(vmRMCtrl);

        // object constructor to create new contact objects based on API return
        // function contactItem(firstName, lastName, email, phone, lastContact, bucket, overdue, daysSince) {
        //     this.firstName = firstName;
        //     this.lastName = lastName;
        //     this.email = email;
        //     this.phone = phone;
        //     this.lastContact = lastContact;
        //     this.bucket = bucket;
        //     this.overdue = overdue;
        //     this.daysSince = daysSince;
        // }

        //
        //     // =======================================================//
        //     // Contacts Page starts here
        //     // =======================================================//
        //
        //
        //     // For todays date (via the datejs library);
        //     var dateToday = Date.today()
        //     var dateMilliseconds = dateToday.getTime()
        //     console.log(dateMilliseconds);
        //
        //     function overdueAmt(){
        //       for(var i = 0; i < vmRMCtrl.googList.length; i++){
        //         var millisecondsOverdue = dateMilliseconds - vmRMCtrl.googList[i].lastContact
        //         var daysSince = (millisecondsOverdue / 86400000)
        //         vmRMCtrl.googList[i].daysSince = Math.round(daysSince)
        //
        //       }
        //
        //     }
        //     // To simulate loading contacts, I should call this after click of "add contacts" and google auth. Putting here for now.
        // //  NOT CALLING THIS YET:
        // //  overdueAmt()
        //
        //
        // //
        //

            // function to check if a given item in the array has a bucket set and then if false return the firstname + lastname of a given object in the array or move to the next if true

            // this function is going to check and see if we have bucketed all of our contacts and, if we have, then return false to disable the button.
            // vmRMCtrl.checkBtnStatus = function() {
            //   if(vmRMCtrl.OnDeck < vmRMCtrl.googList.length){
            //     return true
            //   }
            //   else {
            //     return false
            //   }
            // }

            //bucketing function on click assign bucket value to appropriate key value pair AND call next one
            // function nextContact (){
            //   vmRMCtrl.checkBtnStatus()
            //   if (vmRMCtrl.googList[vmRMCtrl.OnDeck].bucket){
            //     console.log(vmRMCtrl.googList[vmRMCtrl.OnDeck])
            //     // this checks if bucket date is greater than days since last contact and sets overdue to true/false based on that check
            //     if(vmRMCtrl.googList[vmRMCtrl.OnDeck].daysSince <= vmRMCtrl.googList[vmRMCtrl.OnDeck].bucket){
            //       vmRMCtrl.googList[vmRMCtrl.OnDeck].overdue = false
            //     }
            //     else{
            //       vmRMCtrl.googList[vmRMCtrl.OnDeck].overdue = true
            //     }
            //     if(vmRMCtrl.OnDeck < vmRMCtrl.googList.length){
            //         vmRMCtrl.OnDeck++
            //         nextContact()
            //
            //     }
            //     // else{
            //     //   vmRMCtrl.lastMessage = 'All done! Click the button to see notifications.'
            //     //   console.log(vmRMCtrl.lastMessage);
            //     // }
            //
            //   }
            //
            // }
            //this function is going to add the bucket information to the contact objects
        //     vmRMCtrl.contactBucket = function (bucketValue) {
        //       vmRMCtrl.googList[vmRMCtrl.OnDeck].bucket = bucketValue
        //       nextContact()
        //     }
        //     nextContact()
        //
        //
        // vmRMCtrl.checkBtnStatus()

        // //this function is going to connect to the API and add the contacts to the contactList array
        // function contactBucket(){
        //
        //   console.log(contactList.name);
        // }

        // //this function is going to set the preferred notification type by... BUCKET?
        // function notificationType() {
        //
        //   console.log(contactList.name);
        // }

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
    //BUCKETS CONTROLLER STARTS HERE
    //======================================================//


    angular.module('RelationshipMinder')
        .controller('BucketsController', BucketsController)

    BucketsController.$inject = ['rmFactory']

    function BucketsController(rmFactory) {
        var BucketsCtrl = this

        BucketsCtrl.i = 0
        BucketsCtrl.end = false

// Function to get all the contacts from the DB that DON'T have a bucket set.
      rmFactory.getNoBuckets()
        .then(function(result){
          console.log('get no buckets is running in app.js');
          BucketsCtrl.noBuckets = result.data
          console.log(BucketsCtrl.noBuckets)
        })

        BucketsCtrl.contactBucket = function (bucketValue) {
          console.log(BucketsCtrl.i);
          console.log(bucketValue);
          rmFactory.update(BucketsCtrl.noBuckets[BucketsCtrl.i]._id,{'bucket': bucketValue})
          .then( function(response){
            console.log(response);
            if(BucketsCtrl.i < BucketsCtrl.noBuckets.length){
              BucketsCtrl.i++
            }
            else{
              BucketsCtrl.end = true
            }
          }

          )
        }
        // function to check if a given item in the array has a bucket set and then if false return the firstname + lastname of a given object in the array or move to the next if true

        // this function is going to check and see if we have bucketed all of our contacts and, if we have, then return false to disable the button.




        // bucketing function on click assign bucket value to appropriate key value pair AND call next one
        // function nextContact (){
        //   BucketsCtrl.checkBtnStatus()
        //   if (BucketsCtrl.noBuckets[BucketsCtrl.OnDeck].bucket){
        //     console.log(BucketsCtrl.noBuckets[BucketsCtrl.OnDeck])
        //     // this checks if bucket date is greater than days since last contact and sets overdue to true/false based on that check
        //     if(BucketsCtrl.googList[BucketsCtrl.OnDeck].daysSince <= BucketsCtrl.googList[BucketsCtrl.OnDeck].bucket){
        //       BucketsCtrl.googList[BucketsCtrl.OnDeck].overdue = false
        //     }
        //     else{
        //       BucketsCtrl.googList[BucketsCtrl.OnDeck].overdue = true
        //     }
        //     if(BucketsCtrl.OnDeck < BucketsCtrl.googList.length){
        //         BucketsCtrl.OnDeck++
        //         nextContact()
        //
        //     }
        //     else{
        //       BucketsCtrl.lastMessage = 'All done! Click the button to see notifications.'
        //       console.log(BucketsCtrl.lastMessage);
        //     }
        //
        //   }
        //
        // }
        // this function is going to add the bucket information to the contact objects



// TURNING OFF AUTO-INVOKE HERE
            // BucketsCtrl.checkBtnStatus()

            //this function is going to connect to the API and add the contacts to the contactList array
            // function contactBucket(){
            //
            //   console.log(contactList.name);
            // }

            //this function is going to set the preferred notification type by... BUCKET?
            // function notificationType() {
            //
            //   console.log(contactList.name);
            // }
            //

}





    //======================================================//
    //Configure our routes
    //======================================================//
    angular.module('RelationshipMinder')
        .config(routerConfig)
        .directive('repeatDone', repeatDone)


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



    function routerConfig($stateProvider, $urlRouterProvider) {
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
                controller: 'GoogleAuthController as rmAuth'
            })
            .state('buckets', {
                url: '/buckets',
                templateUrl: 'partials/buckets.html',
                // controller: 'BucketsController as BucketsCtrl'
            })
            .state('activity-feed', {
                url: '/activity-feed',
                templateUrl: 'partials/activity-feed.html',
                // controller: 'clientRMController as rmCtrl'
            })
        $urlRouterProvider.otherwise('/landing')
    }

    function repeatDone() {
        return function(scope, element, attrs) {
            if (scope.$last) { // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        }
    }




})();
