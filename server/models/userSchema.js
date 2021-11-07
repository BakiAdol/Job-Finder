const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uName: { type: String, required: true },
  uEmail: { type: String, required: true },
  uPassword: { type: String, required: true },
  uGender: { type: String, required: true },
  uEducations: [String],
  uAddress: [String],
  uLinks: [{ uLinkName: String, uLink: String }],
  uCv: { type: String },
  uExperiences: [{ eName: String, eDetails: String }],
  uProjects: [{ pName: String, pDetails: String }],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
