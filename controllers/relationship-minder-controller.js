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
    overdueContacts: function(req, res) {
      // var id = req.params.id
      db.rmModel.find({
        overdue: true
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
      var id = req.params.id
      db.rmModel.findByIdAndUpdate(id,req.body, function(err, contact){
        console.log('this is request for update')
            res.send(contact)
            console.log(contact);
      })


      // db.rmModel.findOne({_id: id}, function(err, contact) {
      //   console.log("this is rm", req.body[0].firstName)
      //   if (req.body[0].firstName) {
      //     contact.firstName = req.body[0].firstname
      //     console.log('1 ', contact.id);
      //     contact.save(function(err){
      //       if(err){console.log(err);}
      //     })
        // }
        // if (req.body.emailAddress) {
        //   contact.emailAddress = req.body.emailAddress
        //   console.log('2 - req.body.firstname');
        // }
        // if (req.body.bucket) {
        //   contact.bucket = req.body.bucket
        //   console.log('3 - req.body.firstname');
        // }
        // if (req.body.daysSince) {
        //   contact.daysSince = req.body.daysSince
        //   console.log('4 - req.body.firstname');
        // }
        // if (req.body.lastContact) {
        //   contact.lastContact = req.body.lastContact
        //   console.log('5 - req.body.firstname');
        // }
        // if (req.body.overdue) {
        //   contact.overdue = req.body.overdue
        //   console.log('6 - req.body.firstname');
        // }
        // contact.save(function(err, r) {
        //   console.log('7 - req.body.firstname');
        //   console.log('server controller error', err)
        //   console.log('server controller r', r)
        //   res.json(r)
        // })
      // })
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
