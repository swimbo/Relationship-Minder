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

    GoogleAuthController.$inject = ['$http', 'rmFactory', '$location']


    function GoogleAuthController($http, rmFactory, $location) {
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
                    url: "https://www.google.com/m8/feeds/contacts/default/thin?alt=json&access_token=" + authorizationResult.access_token + "&max-results=11&v=3.0"
                }).then(success_callback, error_callback)

                function success_callback(response) {
                    rmAuth.spinner = function() {
                        return true
                    }

                    // See what the raw response looks linked
                    console.log(response);

                    // object constructor to create new contact objects based on API return
                    function contactItem(firstName, lastName, emailAddress1, phoneNumber1, socialMedia, postalAddress, arrayOrder) {
                        this.firstName = firstName;
                        this.lastName = lastName;
                        this.emailAddress1 = emailAddress1;
                        this.phoneNumber1 = phoneNumber1;
                        this.socialMedia = socialMedia;
                        this.postalAddress = postalAddress;
                        this.arrayOrder = arrayOrder;
                    }

                    // Check for Nulls and Undefined and push to new array if neither is present
                    var rawdata = response.data.feed.entry
                    console.log(rawdata);
                    //
                    function removeNullsandUndefined() {

                        var cleanContactArray = []

                        var firstNameGoog = function(i) {
                            if (response.data.feed.entry[i].gd$name !== undefined && response.data.feed.entry[i].gd$name.gd$familyName !== undefined) {
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
                                // if(!rmController.checkIf(cleanContactArray[i].emailAddress1)){
                                  cleanContactArray.push(
                                    new contactItem(
                                      firstNameGoog(i),
                                      lastNameGoog(i),
                                      emailAddress1Goog(i),
                                      phoneNumber1Goog(i),
                                      socialMediaGoog(i),
                                      postalAddressGoog(i),
                                      i
                                    )
                                  )
                                // }
                            }
                            return cleanContactArray
                            console.log(cleanContactArray);
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
                    $location.path('/buckets')

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


    }
    //======================================================//
    //BUCKETS CONTROLLER STARTS HERE
    //======================================================//


    angular.module('RelationshipMinder')
        .controller('BucketsController', BucketsController)

    BucketsController.$inject = ['rmFactory']

    function BucketsController(rmFactory) {
        var BucketsCtrl = this

        // BucketsCtrl.delay = function(){
        //   console.log('50 - timeout function start')
        //   setTimeout(function(){
        //
        //     console.log('51 - timeout function end');
        //   }, 5000)
        // }
        // BucketsCtrl.delay()
        BucketsCtrl.noBuckets = []
        BucketsCtrl.i = 0
        BucketsCtrl.end = false

        // Function to get all the contacts from the DB that DON'T have a bucket set.
        rmFactory.getNoBuckets(function(res) {
            BucketsCtrl.noBuckets = res.data
            console.log(BucketsCtrl.noBuckets);
        })

        var dateToday = Date.today()

        function lastContactRando() {
            var randoLastContact = (dateToday.getTime()) - (Math.random * 8640000000)
            return randoLastContact
            console.log(randoLastContact);
        }
        lastContactRando()

        BucketsCtrl.contactBucket = function(bucketValue) {
            if (BucketsCtrl.i < BucketsCtrl.noBuckets.length - 1) {
                rmFactory.update(BucketsCtrl.noBuckets[BucketsCtrl.i]._id, {
                        'bucket': bucketValue
                    })
                    .then(function(response) {
                        console.log(response)
                        BucketsCtrl.i++
                            console.log(BucketsCtrl.end);
                        console.log(BucketsCtrl.i);
                        console.log(BucketsCtrl.noBuckets.length);
                    })
            } else {
                return BucketsCtrl.end = true
                console.log(BucketsCtrl.end);
            }
            // Inserting fake data in here to make the demo better
            // COMMENT THIS SECTION OUT AFTER DEMO
            for (var i = 0; i < BucketsCtrl.noBuckets.length - 1; i++) {
                var randoDate = (Date.today().getTime() - 864000000 * i)
                rmFactory.update(BucketsCtrl.noBuckets[BucketsCtrl.i]._id, {
                    'lastContact': randoDate
                })
                console.log(randoDate);
            }
        }



        //this function is going to connect to the API and add the contacts to the contactList array
        // function contactBucket(){
        //
        //   console.log(contactList.name);
        // }
        // BucketsCtrl.displayName = function (rmContact) {
        //   console.log('A - formatting user data for display')
        //   if (rmContact.firstName && rmContact.lastName) {
        //   return rmContact.firstName + " " + rmContact.lastName
        //   }
        //   else {return rmContact.emailAddress1}
        //     console.log('B - finished formatting user data')
        //   }

    }



    //======================================================//
    //ACTIVITY-FEED CONTROLLER STARTS HERE
    //======================================================//


    angular.module('RelationshipMinder')
        .controller('ActivityController', ActivityController)

    ActivityController.$inject = ['rmFactory']

    function ActivityController(rmFactory) {
        var ActCtrl = this

        // For todays date (via the datejs library);
        var dateToday = Date.today()
        var dateMilliseconds = dateToday.getTime()
        console.log(dateMilliseconds);

        // Function to calculate the daysSince last contacts
        ActCtrl.startOnLoad = function(){
            console.log('1 - start on load is going');
            rmFactory.getAll()
              .then(function(response){
                console.log(response.data);
                console.log('2 - rmFactory.getAll called on activity-feed');
                ActCtrl.allContacts = response.data
                for (var i = 0; i < ActCtrl.allContacts.length; i++) {
                  var daysSinceCalc = ((dateMilliseconds - ActCtrl.allContacts[i].lastContact) / 86400000)
                  ActCtrl.allContacts[i].daysSince = daysSinceCalc
                  if(ActCtrl.allContacts[i].daysSince >= ActCtrl.allContacts[i].bucket){
                    ActCtrl.allContacts[i].overdue = true
                  }
                  else{ActCtrl.allContacts[i].overdue = false}
                }
                console.log({users: ActCtrl.allContacts});
                // rmFactory.updateAll({users: ActCtrl.allContacts})

// *****************************************************************************
// Refactor Target !
// *****************************************************************************
                // for (var i = 0; i < ActCtrl.allContacts.length; i++) {
                  //     var daysSinceCalc = ((dateMilliseconds - ActCtrl.allContacts[i].lastContact) / 86400000)
                //     console.log(daysSinceCalc);
                //     console.log(ActCtrl.allContacts[i]._id);
                    // rmFactory.updateAll(ActCtrl.allContacts[i]._id, {'daysSince': daysSinceCalc})
                    //     .then(function(response) {
                    //         console.log('i hope this goes ' + response);
                    //         console.log();
                    //         // Set the boolean "overdue" to true if applicable
                    //         for (var i = 0; i < response.data.length; i++) {
                    //           console.log('updating overdue if overdue');
                    //           console.log(response.data[i].daysSince);
                    //           if (response.data[i].daysSince >= response.data[i].bucket) {
                    //               rmFactory.update(response.data._id, {
                    //                   'overdue': true
                    //               })
                    //           }
                    //           else{
                    //             console.log(response.data._id + ' not overdue!');
                    //           }
                    //         }
                    //
                    //     })
// *****************************************************************************
// Refactor Target !
// *****************************************************************************

              })

        // rmFactory.getAll()
        }


        ActCtrl.updateOnClick = function(rmContact){
          console.log(rmContact.lastContact);
          rmContact.lastContact = dateToday.getTime()
          rmContact.overdue = false
          console.log(rmContact.lastContact);
          rmFactory.update(rmContact._id, rmContact)
        }

}



    //======================================================//
    //Configure our routes
    //======================================================//
    angular.module('RelationshipMinder')
        .config(routerConfig)
        .directive('repeatDone', repeatDone)


    routerConfig.$inject = ['$stateProvider', '$urlRouterProvider']


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
                controller: 'ActivityController as ActCtrl'
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
