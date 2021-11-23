const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jUserId: { type: String, required: true },
  jPostDate: new Date(),
  jDeadline: { type: String, required: true },
  jTitle: { type: String, required: true },
  jDescription: { type: String, required: true },
  jImage: { type: String },
  jCatagory: [{ type: String, require: true }],
  jApplicants: [{ applicantId: String, applicantCv: String }],
});

const Job = mongoose.model("job", jobSchema);

module.exports = Job;
