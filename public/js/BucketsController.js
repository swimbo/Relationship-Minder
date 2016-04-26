(function (arguments) {
  'use strict'

  angular.module('RelationshipMinder')
      .controller('BucketsController', BucketsController)

  BucketsController.$inject = ['rmFactory']

  function BucketsController(rmFactory) {
      var BucketsCtrl = this



// =======================================================//
// Buckets Page starts here
// =======================================================//

rmFactory.getAll()
      .then(function(result){
        console.log(result);
        for (var i = 0; i < result.data.length; i++) {
           var dbContacts = rmFactory.getAll()
           dbContacts[i]
        }
        if(rmFactory.getSingle.bucket){
              console.log('bucket exists');
        }
        else{

        }
  })
rm.Factory.getAll()

// function to check if a given item in the array has a bucket set and then if false return the firstname + lastname of a given object in the array or move to the next if true

// this function is going to check and see if we have bucketed all of our contacts and, if we have, then return false to disable the button.
BucketsCtrl.checkBtnStatus = function() {
  if(BucketsCtrl.OnDeck < BucketsCtrl.googList.length){
    return true
  }
  else {
    return false
  }
}

// bucketing function on click assign bucket value to appropriate key value pair AND call next one
function nextContact (){
  BucketsCtrl.checkBtnStatus()
  if (BucketsCtrl.googList[BucketsCtrl.OnDeck].bucket){
    console.log(BucketsCtrl.googList[BucketsCtrl.OnDeck])
    // this checks if bucket date is greater than days since last contact and sets overdue to true/false based on that check
    if(BucketsCtrl.googList[BucketsCtrl.OnDeck].daysSince <= BucketsCtrl.googList[BucketsCtrl.OnDeck].bucket){
      BucketsCtrl.googList[BucketsCtrl.OnDeck].overdue = false
    }
    else{
      BucketsCtrl.googList[BucketsCtrl.OnDeck].overdue = true
    }
    if(BucketsCtrl.OnDeck < BucketsCtrl.googList.length){
        BucketsCtrl.OnDeck++
        nextContact()

    }
    // else{
    //   BucketsCtrl.lastMessage = 'All done! Click the button to see notifications.'
    //   console.log(BucketsCtrl.lastMessage);
    // }

  }

}
// this function is going to add the bucket information to the contact objects
    BucketsCtrl.contactBucket = function (bucketValue) {
      BucketsCtrl.googList[BucketsCtrl.OnDeck].bucket = bucketValue
      nextContact()
    }
    nextContact()


BucketsCtrl.checkBtnStatus()

//this function is going to connect to the API and add the contacts to the contactList array
function contactBucket(){

  console.log(contactList.name);
}

//this function is going to set the preferred notification type by... BUCKET?
function notificationType() {

  console.log(contactList.name);
}

// =======================================================//
// Notification Page logic starts here
// =======================================================//

// this function is going to create an notificationArray of all the contacts who are overdue by filtering the array
function createNotificationArray() {

  console.log(contactList.name);
}

// this function is going to add the number of days overdue to the alertArray
  function (){

    console.log(contactList.name);
  }


}

})();
