const express = require("express");
const router = express.Router();

require("../db/dbconn");
const User = require("../models/userSchema");

router.post("/register", async (req, res) => {
  const { uName, uEmail, uPassword, uConfirmPassword, uGender } = req.body;

  if (!uName || !uEmail || !uPassword || !uConfirmPassword) {
    return res.status(422).json({ error: "Fill all fields!" });
  }

  try {
    const userExist = await User.findOne({ uEmail: uEmail });
    if (userExist) {
      return res.status(422).json({ error: "Email Already Exist!" });
    }

    const newUser = new User({ uName, uEmail, uPassword, uGender });

    await newUser.save();
    res.status(201).json("User registration successful!");
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { uEmail, uPassword } = req.body;

  if (!uEmail || !uPassword) {
    return res.status(422).json({ error: "Fill all fields!" });
  }

  try {
    const userExist = await User.findOne({ uEmail: uEmail });
    if (!userExist) {
      return res.status(422).json({ error: "Wrong email of password!" });
    }
    res.status(201).json("Login in successfull!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
