const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uName: { type: String, required: true },
  uEmail: { type: String, required: true },
  uPassword: { type: String, required: true },
  uGender: { type: String, required: true },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
