(function (arguments) {
  'use strict'

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
                      url: "https://www.google.com/m8/feeds/contacts/default/thin?alt=json&access_token=" + authorizationResult.access_token + "&max-results=3&v=3.0"
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

})();
