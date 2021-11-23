const express = require("express");
const jobRouter = express.Router();

const { PostNewJobFunction } = require("../controllers/jobController");

// new job post
jobRouter.post("/postnewjob", PostNewJobFunction);

module.exports = jobRouter;
