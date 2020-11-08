const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
  name: String,
  isDone: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
    default: Date,
  },
  position: Number,
});

module.exports = Task;
