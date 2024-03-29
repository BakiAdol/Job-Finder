const { Mongoose } = require("mongoose");
const Job = require("../models/jobSchema");
const User = require("../models/userSchema");

require("../db/dbconn");

module.exports = {
  async PostNewJobFunction(req, res) {
    let { jUserId, jDeadline, jTitle, jDescription, jCatagory, jImage } =
      req.body;
    // jCatagory = jCatagory.split(",");

    const jPostDate = new Date();

    if (!jUserId || !jTitle || !jDescription || !jCatagory) {
      return res.status(422).json({ error: "Fill all fields!" });
    }

    try {
      let newJ = {
        jUserId,
        jDeadline,
        jTitle,
        jDescription,
        jCatagory,
        jPostDate,
      };

      if (jImage) newJ.jImage = jImage;
      const newJob = new Job(newJ);

      await newJob.save();
      res.status(201).json({ msg: "Job Post successful!" });
    } catch (error) {
      console.log(error);
      return res.status(422).json({ error: "Server Error!" });
    }
  },
  async ShowAllJobsFunction(req, res) {
    try {
      const { jobCata } = req.body;

      const jobs = await Job.find(
        jobCata.length === 0 ? {} : { jCatagory: { $in: [...jobCata] } }
      )
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
      const jobs = await Job.find({ jUserId })
        .populate("jUserId", "uName")
        .sort({ jPostDate: -1 });
      res.send(jobs);
    } catch (error) {
      console.log(error);
      return res.status(422).json({ error: "Server Error!" });
    }
  },
  async ShowMyAllApplieJobFunction(req, res) {
    try {
      const { uApplieJobs } = req.body;
      const jobs = await Job.find({ _id: { $in: [...uApplieJobs] } })
        .populate("jUserId", "uName") // pri foreign jUserId, and get uName
        .sort({
          jPostDate: -1,
        });
      res.send(jobs);
    } catch (error) {
      console.log(error);
      return res.status(422).json({ error: "Server Error!" });
    }
  },
  async ApplieForJobFunction(req, res) {
    try {
      let { jApplicantsId, jobId, jApplicantKeywords, jUserCvName } = req.body;

      const jUserMarked = false;

      const alreadyAppli = await User.findOne({
        _id: jApplicantsId,
        uJobApplies: { $in: [jobId] },
      });

      if (alreadyAppli) {
        return res.status(300).json({ msg: "You Already Applied!" });
      }
      const updateAppli = await User.updateOne(
        { _id: jApplicantsId },
        {
          $push: {
            uJobApplies: jobId,
          },
        }
      );

      const updateAppliJob = await Job.updateOne(
        { _id: jobId },
        {
          $push: {
            jApplicants: {
              jApplicantsId,
              jUserCvName,
              jApplicantKeywords,
              jUserMarked,
            },
          },
        }
      );
      res.status(200).json({ msg: "Applie successful!" });
    } catch (err) {
      return res.status(422).json({ msg: "Server error!" });
    }
  },
  async getThisJobFunction(req, res) {
    try {
      const { jUserId, jobId } = req.body;

      const job = await Job.findOne({ _id: jobId }).populate(
        "jUserId",
        "uName"
      );
      res.send(job);
    } catch (error) {
      console.log(error);
      return res.status(422).json({ error: "Server Error!" });
    }
  },
  async MarkUnmarkApplicantFunction(req, res) {
    try {
      const { jobId, allApplicants } = req.body;

      const updateAppli = await Job.updateOne(
        { _id: jobId },
        {
          $set: {
            jApplicants: allApplicants,
          },
        }
      );

      res.send("seccess");
    } catch (error) {
      console.log(error);
      return res.status(422).json({ error: "Server Error!" });
    }
  },
};
