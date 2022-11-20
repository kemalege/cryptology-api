const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CipherKeySchema = new Schema({

  value: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CipherKey", CipherKeySchema);
