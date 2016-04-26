;
(function() {
  'use strict'

  angular.module('myControllers', [])
    .controller('clientRMController', clientRMController)

  clientRMController.$inject = ['rmFactory']

function clientRMController(rmFactory) {
  var rmCtrl = this
  rmCtrl.newRMContact = {}

    rmFactory.getAll()
      .then(function(response) {
        console.log('Array of contacts from database api', response.data)
        rmCtrl.rmContacts = response.data

      })

    rmCtrl.addrmContact = function(rmContacts) {
      console.log('1 - Client: ng-click for adding an rmContact: running inside the controller.js file')
      rmFactory.create(rmContacts)
        .then(function(res) {
          console.log('6 - client: running inside the controller.js file --- end communication between client and server', res)
        })
    }

    rmCtrl.showrmContactDetail = function(id) {
      rmFactory.getSingle(id)
        .then(function(res) {
          console.log("grabbed single record", res)
        })
    }

    rmCtrl.shownoBucketDetail = function() {
      rmFactory.getNoBucket()
        .then(function(res) {
          console.log("grabbed a record with no bucket", res)
        })
    }

    rmCtrl.deleteDetail = function(id) {
      console.log('1 - Client: ng-click for deleting an rmContact: running inside the controller.js file')
      rmFactory.destroy(id)
        .then(function(res) {
          console.log("Deleted rmContact")
        })
      rmFactory.getAll()
        .then(function(response) {
          console.log('6 - client: running inside the controller.js file --- end communication between client and server')
          rmCtrl.rmContacts = response.data
        })
    }

    rmCtrl.update = function(rmContact) {
      console.log(rmContact)
      rmFactory.update(rmContacts._id,rmContact)
        .then(function(res) {
          console.log("Updated rmContact", res)
        })
    }

    rmCtrl.initModals = function() {
      $('.modal-trigger').leanModal() // Initialize the modals
    }
    rmCtrl.setCurrentR = function(rmContact) {
      rmCtrl.currentR = rmContacts// Initialize the modals
    }

  }


}())
