(function (arguments) {

  //======================================================//
  // Declare the module and the controller
  //======================================================//
  angular.module('relationshipMinder', ['ngAnimate', 'ui.router'])
  // =======================================================//
  // our controller for the webapp flow
  // =======================================================//
      .controller('rmController', function())


function rmController (){
  var rmCont = this

  // we will store all of our contacts in this array
  this.contactList = [{'test0@gmail.com'},{'test1@gmail.com'}];

  // factory to turn our contacts into objects with durations
  this.processForm = function() {
      rmCont.contactList.f
      alert('awesome!');
  };

  function contactItem(firstName, lastName, email, bucket, lastContact) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.bucket = bucket;
      this.lastContact = lastContact
    }




}





  //======================================================//
  // Configure our routes
  //======================================================//
    .config(function($stateProvider, $urlRouterProvider) {

      $stateProvider

      // Route to show the first page

      .state('getting-started', {
            url: '/getting-started',
            templateUrl: 'getting-started.html',
            controller: 'rmController as rmControl'
        })
        // nested states
        // each of these sections will have their own view
        // url will be nested (/form/profile)
       .state('getting-started.connect', {
           url: '/connect-account',
           templateUrl: 'connect-account.html'
       })

       // url will be /form/interests
       .state('form.interests', {
           url: '/interests',
           templateUrl: 'form-interests.html'
       })

       // url will be /form/payment
       .state('form.payment', {
           url: '/payment',
           templateUrl: 'form-payment.html'
       });

           // catch all route
           // send users to the form page
           $urlRouterProvider.otherwise('/form/profile');
       })


})();
