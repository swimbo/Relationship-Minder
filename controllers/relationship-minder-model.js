var db = require('../models/relationship-minder-model')

module.exports = {
  rmController: {
    getAll: function(req, res) {
      db.rmModel.find({}, function(err, restaurants) {
        if (err) {
          res.json(err)
        } else {
          res.json(restaurants)
        }
      })
    },
    getSingle: function(req, res) {
      var id = req.params.id
        // var restaurant = restaurants.filter(function(r) {
        //   return r._id == id
        // })
      db.rmModel.findOne({
        _id: id
      }, function(err, rest) {
        if (err) {
          res.json(err)
        } else {
          console.log("Getting a single Restaurant");
          res.json(rest)
        }
      })
    },
    update: function(req, res) {
      console.log('this is req', req.body)
      var id = req.params.id
      db.rmModel.findOne({_id: id}, function(err, rest) {
        console.log("this is rest", rest)
        if (req.body.firstName) {
          rest.firstName = req.body.firstName
        }
        if (req.body.emailAddress) {
          rest.emailAddress = req.body.emailAddress
        }
        if (req.body.bucket) {
          rest.bucket = req.body.bucket
        }
        if (req.body.daysSince) {
          rest.daysSince = req.body.daysSince
        }
        rest.save(function(err, r) {
          console.log(err)
          console.log(r)
          res.json(r)
        })
      })
    },
    create: function(req, res) {
      console.log('3 - serverSide: running inside the restaurants_controller.js file', req)
      var restaurant = new db.rmModel(req.body)
      restaurant.save(function(err, rest) {
        if (err) res.json(err)
        console.log("4 - serverSide: running inside the restaurants_controller.js file --- Restaurant Created!!!", rest)
        res.json(rest)
      })
    },
    destroy: function(req, res) {
      console.log('3 - serverSide: running inside the restaurants_controller.js file')
      var id = req.params.id
      db.rmModel.remove({_id: id}, function(err) {
        if (err) res.json(err)
        console.log("4 - serverSide: running inside the restaurants_controller.js file --- Restaurant Deleted!!!")
        res.json({
          message: "Deleted User!"
        })
      })

    }
  }
}
