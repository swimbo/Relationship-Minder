;(function () {
  'use strict'
  angular.module('myFactory', [])
    .factory('rmFactory', rmFactory)

  rmFactory.$inject = ['$http']

  function rmFactory ($http) {
    var rmData = {},
        apiUrl = 'http://localhost:8081/api/v1/relationship-minder'

    rmData.getAll = function () {
      console.log('A - getting all rmContacts')
      return $http.get(apiUrl).then(function(response){
        console.log(response);
        return response
        console.log('B - client: running inside the factory.js file')
      })
    }

    rmData.updateAll = function (body) {
      console.log('J - updating all rmContacts')
      console.log(body);
      return $http.post(apiUrl, body).then(function(response){
        console.log(response);
        return response
        console.log('K - client: running inside the factory.js file')
      })
    }

    rmData.create = function (contactItem) {
      console.log('C - client: running inside the factory.js file', contactItem)
      $http.post(apiUrl, contactItem).then(function(response){
        console.log(response);
        console.log('D - client: running inside the factory.js file')
       })
    }

    rmData.getSingle = function(id){
      console.log('E -getting single contact data:',id)
      return $http.get(apiUrl + '/' + id)
    }

    rmData.getNoBuckets = function(callback){
      console.log('G - getting all contacts without a bucket')
      $http.get(apiUrl + '/noBuckets')
            .then(function(res){
              callback(res)
            })
    }

    rmData.getOverdueContacts = function(callback){
      console.log('I - getting all contacts that are overdue')
      $http.get(apiUrl + '/overdueContacts')
            .then(function(res){
              callback(res)
            })
    }

    rmData.destroy = function(id){
      console.log('2 - client: running inside the factory.js file')
      var result = $http.delete(apiUrl + '/' + id)
      console.log('5 - client: running inside the factory.js file')
      return result
    }

    rmData.update = function(id, rmContact){
      console.log('Updated contact data: ', id, rmContact)
      return $http.put(apiUrl + '/' + id, rmContact)
    }

    rmData.displayName = function (rmContact) {
      console.log('A - formatting user data for display')
      if (rmContact.firstName && rmContact.lastName) {
      return rmContact.firstName + " " + rmContact.lastName
      }
      else {return rmContact.emailAddress1}
        console.log('B - finished formatting user data')
      }

    return rmData
  }
}())
