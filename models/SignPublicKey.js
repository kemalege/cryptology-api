const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SignPublicKeySchema = new Schema({
  id: {
    type: String,
  },
  value: {
    
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("SignPublicKey", SignPublicKeySchema);
