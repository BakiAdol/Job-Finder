const express = require("express");
const router = express.Router();

require("../db/dbconn");
const User = require("../models/userSchema");

router.post("/register", (req, res) => {
  const { uName, uEmail, uPassword, uConfirmPassword, uGender } = req.body;

  if (!uName || !uEmail || !uPassword || !uConfirmPassword) {
    return res.status(422).json({ error: "Fill all fields!" });
  }

  User.findOne({ uEmail: uEmail })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "Email Already Exist!" });
      }
      const newUser = new User({ uName, uEmail, uPassword, uGender });
      newUser
        .save()
        .then(() => {
          res.status(201).json("User registration successful!");
        })
        .catch((error) => {
          res.status(500).json({ error: "registration failed!" });
        });
    })
    .catch((error) => {
      console.log("reg error!");
    });
});

module.exports = router;
