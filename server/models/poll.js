const mongoose = require("mongoose");

const optionSchema = mongoose.Schema({
  option: String,
  votes: {
    type: Number,
    default: 0,
  },
});

const pollSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  question: String,
  options: [optionSchema],
  created: {
    type: Date,
    default: Date.now,
  },
  voted: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Poll", pollSchema);
