const { Mongoose } = require("mongoose");
const Job = require("../models/jobSchema");
const User = require("../models/userSchema");

require("../db/dbconn");

module.exports = {
  async PostNewJobFunction(req, res) {
    let { jUserId, jDeadline, jTitle, jDescription, jCatagory, jApplicants } =
      req.body;

    const jPostDate = new Date();
    let jImage;
    if (!req.file) jImage = "";
    else jImage = req.file.filename;

    jCatagory = jCatagory.split(",");

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
      const jobs = await Job.find({})
        .populate("jUserId", "uName")
        .sort({ jPostDate: -1 });

      res.send(jobs);

      // Job.find({})
      //   .populate("jUserId", "uName")
      //   .exec(function (err, story) {
      //     // console.log(err, story);
      //     console.log("id ", story.jUserId);
      //   });
      // return;
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
