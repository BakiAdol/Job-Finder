const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const { PostNewJobFunction } = require("../controllers/jobController");
const {
  registerFunction,
  loginFunction,
  logoutFunction,
  loggendInFunction,
  getUserFunction,
  updaetBioFunction,
  updateExperiencesFunction,
  updateProjectsFunction,
} = require("../controllers/authControllers");

// register
router.post("/register", registerFunction);

// login
router.post("/login", loginFunction);

// logout
router.get("/logout", logoutFunction);

// loggedIn
router.get("/loggedin", loggendInFunction);

// get user
router.post("/user/userdata", getUserFunction);

// update user bio
router.post("/profileupdate/bio", updaetBioFunction);

// update user experiences
router.post("/profileupdate/experiences", updateExperiencesFunction);

// update user profects
router.post("/profileupdate/projects", updateProjectsFunction);

// upload cv
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.post("/usercvupload", upload.single("cvFile"), async (req, res) => {
  try {
    // const { userId } = req.body;
    const userId = "61883a1f12a0fa9175f9b7fb";
    const updateInfo = await User.updateOne(
      { _id: userId },
      {
        $set: {
          uCv: req.file.path,
        },
      }
    );
    res.json({ success: "Update successful!" });
  } catch (err) {
    return res.status(422).json({ error: "Server error!" });
  }
});
//.......

// upload profile picture
router.post(
  "/userprofilepicupload",
  upload.single("proPicFile"),
  async (req, res) => {
    try {
      // const { userId } = req.body;
      const userId = "61883a1f12a0fa9175f9b7fb";
      const updateInfo = await User.updateOne(
        { _id: userId },
        {
          $set: {
            uProfilePic: req.file.path,
          },
        }
      );
      res.json({ success: "Update successful!" });
    } catch (err) {
      return res.status(422).json({ error: "Server error!" });
    }
  }
);

//............................. job router
// new job post
router.post("/postnewjob", PostNewJobFunction);

module.exports = router;
