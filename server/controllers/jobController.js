const Job = require("../models/jobSchema");
require("../db/dbconn");

module.exports = {
  async PostNewJobFunction(req, res) {
    const {
      jUserId,
      jDeadline,
      jTitle,
      jDescription,
      jImage,
      jCatagory,
      jApplicants,
    } = req.body;
    const jPostDate = new Date();

    if (!jUserId || !jTitle || !jDescription || !jCatagory) {
      return res.status(422).json({ error: "Fill all fields!" });
    }

    try {
      const newJob = new Job({
        jUserId,
        jDeadline,
        jTitle,
        jDescription,
        jImage,
        jCatagory,
        jApplicants,
        jPostDate,
      });
      await newJob.save();
      res.status(201).json({ msg: "Job Post successful!" });
    } catch (error) {
      console.log(error);
      return res.status(422).json({ error: "Server Error!" });
    }

    console.log("body", jUserId, jCatagory);
  },
};
