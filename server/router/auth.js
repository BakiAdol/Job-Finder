const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

require("../db/dbconn");
const User = require("../models/userSchema");

router.post("/register", async (req, res) => {
  const { uName, uEmail, uPassword, uConfirmPassword, uGender } = req.body;

  if (!uName || !uEmail || !uPassword || !uConfirmPassword) {
    return res.status(422).json({ error: "Fill all fields!" });
  }
  if (uPassword != uConfirmPassword) {
    return res.status(422).json({ error: "Password didn't match!" });
  }

  try {
    const userExist = await User.findOne({ uEmail: uEmail });
    if (userExist) {
      return res.status(422).json({ error: "Email Already Exist!" });
    }

    const salt = await bcrypt.genSalt((saltRounds = 10));
    const hasPass = await bcrypt.hash(uPassword, salt);
    const newUser = new User({ uName, uEmail, uPassword: hasPass, uGender });

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

    const isMatch = await bcrypt.compare(uPassword, userExist.uPassword);
    if (!isMatch) {
      return res.status(422).json({ error: "Wrong email of password!" });
    }
    res.status(201).json("Login in successfull!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
