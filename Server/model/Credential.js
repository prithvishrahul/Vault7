const mongoose = require("mongoose");

const Credential = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
}, {timestamps: true});


// export model user with UserSchema
module.exports = mongoose.model("credential", Credential);
