var db = require('../models/relationship-minder-model')

module.exports = {
  rmController: {
    getAll: function(req, res) {
      db.rmModel.find({}, function(err, rmContact) {
        if (err) {
          res.json(err)
        } else {
          res.json(rmContact)
        }
      })
    },
    getSingle: function(req, res) {
      var id = req.params.id

      db.rmModel.findOne({
        _id: id
      }, function(err, contact) {
        if (err) {
          res.json(err)
        } else {
          console.log("Getting a single rmContact");
          res.json(contact)
        }
      })
    },
    update: function(req, res) {
      console.log('this is req', rmContact)
      var id = req.params.id
      db.rmModel.findOne({_id: id}, function(err, contact) {
        console.log("this is rm", contact)
        if (rmContact.firstName) {
          contact.firstName = rmContact.firstName
        }
        if (rmContact.emailAddress) {
          contact.emailAddress = rmContact.emailAddress
        }
        if (rmContact.bucket) {
          contact.bucket = rmContact.bucket
        }
        if (rmContact.daysSince) {
          contact.daysSince = rmContact.daysSince
        }
        contact.save(function(err, r) {
          console.log(err)
          console.log(r)
          res.json(r)
        })
      })
    },
    create: function(req, res) {
      console.log('3 - serverSide: running inside the relationship-minder-controller.js file', req.body)
      var rmContact = new db.rmModel(req.body)
      rmContact.save(function(err, rmContact) {
        if (err) res.json(err)
        console.log("4 - serverSide: running inside the relationship-minder-controller.js file --- rmContact Created!!!", rmContact)
        res.json(rmContact)
      })
    },
    destroy: function(req, res) {
      console.log('3 - serverSide: running inside the relationship-minder-controller.js file')
      var id = req.params.id
      db.rmModel.remove({_id: id}, function(err) {
        if (err) res.json(err)
        console.log("4 - serverSide: running inside the relationship-minder-controller.js file --- rmContact Deleted!!!")
        res.json({
          message: "Deleted User!"
        })
      })

    }
  }
}
