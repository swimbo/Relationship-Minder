var
  apiRouter = require('express').Router(),// setting the apiRouter variable to express.Router()
  ctrl      = require('./controllers/relationship-minder-controller') // requiring the relationship-minder-controller and setting it to the variable ctrl

  apiRouter.route('/relationship-minder')
    .get(ctrl.rmController.getAll)
    .post(ctrl.rmController.create)

  apiRouter.route('/relationship-minder/noBuckets')
    .get(ctrl.rmController.noBuckets)

    apiRouter.route('/relationship-minder/overdueContacts')
      .get(ctrl.rmController.overdueContacts)

   apiRouter.route('/relationship-minder/:id')
  //http://localhost:3000/api/v1/relationship-minder/:valueHere
    .get(ctrl.rmController.getSingle)
    .put(ctrl.rmController.update)
    .delete(ctrl.rmController.destroy)


module.exports  = apiRouter
