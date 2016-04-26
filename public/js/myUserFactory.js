;(function () {
  'use strict'
  angular.module('relationship-minder')
    .factory('userFactory', userFactory)

userFactory.$inject = ['rmController']

  function rmFactory (rmController) {
    var userData = {},

    userData.displayName = function (rmContact) {
      console.log('A - formatting user data for display')
      if (rmContact.firstName && rmContact.lastName) {
      return rmContact.firstName + " " + rmContact.lastName
      }
      else {return rmContact.emailAddress1}
        console.log('B - finished formatting user data')
      }
    }


    return userData
  }
}())
