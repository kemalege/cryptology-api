const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CipherTextSchema = new Schema({
  content: {
    type: String,
  },
  key: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CipherText", CipherTextSchema);
