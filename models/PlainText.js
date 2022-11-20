const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlainTextSchema = new Schema({
  content: {
    type: String,
    required: [true, "please provide a text"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PlainText", PlainTextSchema);
