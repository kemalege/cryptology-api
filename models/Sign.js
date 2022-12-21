const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SignSchema = new Schema({
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Sign", SignSchema);
