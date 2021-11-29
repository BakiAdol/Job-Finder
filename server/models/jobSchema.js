const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  jPostDate: { type: Date },
  jDeadline: { type: Date },
  jTitle: { type: String, required: true },
  jDescription: { type: String, required: true },
  jImage: { type: String },
  jCatagory: [{ type: String }],
  jApplicants: [
    {
      jApplicantsId: mongoose.Schema.Types.ObjectId,
      jUserCvName: String,
      jApplicantKeywords: [{ type: String }],
      jUserMarked: Boolean,
    },
  ],
});

// {
//   userId: String,
//   jUserCvName: String,
// },

const Job = mongoose.model("job", jobSchema);

module.exports = Job;
