var mongoose       = require('mongoose'),      // <-- assigning mongoose to the variable, mongoose
  Schema           = mongoose.Schema,          // creating a Schema variable that points to mongoose's Schema method
  rmSchema = new Schema({              // Creating a reuseable rm Schema, using the new keyword, along with the Schema variable that is linked to mongoose's Schema method
      firstName    : {type: String, required: true},  // <-- setting a data type for the first name key, and setting it to validate that a string is put in
      lastName     :  String,  // <-- setting a data type for the last name key
      emailAddress :  String,  // <-- setting the data type for the email address key to string
      phoneNumber  :  String,  // <-- setting the phone number type for the email address key to string
      lastContact  : {type: Number, min: 0}, // <-- setting the data type for the last contact key to number with a minimum number of 0
      bucket       :  Number, //<-- setting the data type for the bucket key to number.
      overdue      :  Boolean,                          // <-- setting the data type for the address key to string
      daysSince    : {type: Number, min: 0},  // <-- setting a data type for the days since key, and setting it to validate that a number greater 0

      createdAt    : {type: Date, Default: Date.now}, // setting the createdAt key to automatically assign the specific day date to createdAt
      nextContact  :  Date,
      facebook     :  String

  })


  module.exports = { // turning the variable rmSchema into a mongoose model, assigning it to the rmModel key inside the module.exports object
    rmModel : mongoose.model('rmModel', rmSchema)
  }
