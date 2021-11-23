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
  },
  async ShowAllJobsFunction(req, res) {
    try {
      const jobs = await Job.find({}).sort({ jPostDate: -1 });
      res.send(jobs);
    } catch (error) {
      console.log(error);
      return res.status(422).json({ error: "Server Error!" });
    }
  },
  async ShowMyAllJobsFunction(req, res) {
    try {
      const { jUserId } = req.body;
      const jobs = await Job.find({ jUserId }).sort({ jPostDate: -1 });
      res.send(jobs);
    } catch (error) {
      console.log(error);
      return res.status(422).json({ error: "Server Error!" });
    }
  },
};
