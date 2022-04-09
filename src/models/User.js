const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
