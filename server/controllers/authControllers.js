const bcrypt = require("bcryptjs");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

require("../db/dbconn");

module.exports = {
  async registerFunction(req, res) {
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
      let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      res.status(201).json({ msg: "User registration successful!" });
    } catch (error) {
      console.log(error);
    }
  },
  async loginFunction(req, res) {
    const { uEmail, uPassword } = req.body;

    if (!uEmail || !uPassword) {
      return res.status(422).json({ error: "Fill all fields!" });
    }

    try {
      const userExist = await User.findOne({ uEmail: uEmail });
      if (!userExist) {
        return res.status(422).json({ error: "Wrong email or password!" });
      }

      const isMatch = await bcrypt.compare(uPassword, userExist.uPassword);
      if (!isMatch) {
        return res.status(422).json({ error: "Wrong email or password!" });
      }

      let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      return res.status(201).json({ msg: "Login in successfull!" });
    } catch (error) {
      console.log(error);
      return res.status(422).json({ error: "Server error!" });
    }
  },
  async logoutFunction(req, res) {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .send();
  },
};
