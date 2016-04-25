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
    noBuckets: function(req, res) {
      // var id = req.params.id

      db.rmModel.find({
        bucket: 0
      }, function(err, rmContact) {
        if (err) {
          res.json(err)
        } else {
          console.log("Getting a contact without a bucket");
          res.json(rmContact)
        }
      })
    },
    update: function(req, res) {
      console.log('this is request for update')
      var id = req.params.id
      db.rmModel.findOne({_id: id}, function(err, contact) {
        console.log("this is rm", contact)
        if (req.body.firstName) {
          contact.firstName = req.body.firstName
        }
        if (req.body.emailAddress) {
          contact.emailAddress = req.body.emailAddress
        }
        if (req.body.bucket) {
          contact.bucket = req.body.bucket
        }
        if (req.body.daysSince) {
          contact.daysSince = req.body.daysSince
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
