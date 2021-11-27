const bcrypt = require("bcryptjs");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const fs = require("fs");

require("../db/dbconn");

module.exports = {
  async registerFunction(req, res) {
    const { uName, uPropic, uEmail, uPassword, uConfirmPassword, uGender } =
      req.body;

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
      const newUser = new User({
        uName,
        uPropic,
        uEmail,
        uPassword: hasPass,
        uGender,
      });

      await newUser.save();
      let token = jwt.sign({ _id: newUser._id }, process.env.SECRET_KEY);
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

      let token = jwt.sign({ _id: userExist._id }, process.env.SECRET_KEY);

      res.cookie("token", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      return res.status(201).json({ msg: "Login in successfull!" });
    } catch (error) {
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
  async loggendInFunction(req, res) {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.json({ isLoggedIn: false });
      }

      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

      res.json({ isLoggedIn: true, rootUserId: verifyToken._id });
    } catch (error) {
      res.json({ isLoggedIn: false });
    }
  },
  async getUserFunction(req, res) {
    try {
      const userId = req.body.userId;
      const UserInfo = await User.findOne({ _id: userId });
      res.json({ uInfo: UserInfo });
    } catch (err) {
      return res.status(422).json({ error: "Server error!" });
    }
  },

  async updaetBioFunction(req, res) {
    try {
      const { userId, userEdu, userAddr, userLink } = req.body;
      const updateInfo = await User.updateOne(
        { _id: userId },
        {
          $set: {
            uEducations: userEdu,
            uAddress: userAddr,
            uLinks: userLink,
          },
        }
      );
      res.json({ success: "Update successful!" });
    } catch (err) {
      return res.status(422).json({ error: "Server error!" });
    }
  },

  async updateExperiencesFunction(req, res) {
    try {
      const { userId, uExperiences } = req.body;
      const updateInfo = await User.updateOne(
        { _id: userId },
        {
          $set: {
            uExperiences,
          },
        }
      );
      res.json({ success: "Update successful!" });
    } catch (err) {
      return res.status(422).json({ error: "Server error!" });
    }
  },

  async updateProjectsFunction(req, res) {
    try {
      const { userId, uProjects } = req.body;
      const updateInfo = await User.updateOne(
        { _id: userId },
        {
          $set: {
            uProjects,
          },
        }
      );
      res.json({ success: "Update successful!" });
    } catch (err) {
      return res.status(422).json({ error: "Server error!" });
    }
  },

  async updateUserProfilePicFunction(req, res) {
    try {
      const { _id } = req.body;
      const uPropic = req.file.filename;
      const previousPro = await User.findOne({ _id }, { uPropic: 1 });
      if (previousPro.uPropic !== "blnkpropic.gif") {
        const imagePath = `../client//public//images//profilepic//${previousPro.uPropic}`;
        fs.unlinkSync(imagePath);
      }

      const updatePro = await User.updateOne(
        { _id },
        {
          $set: {
            uPropic,
          },
        }
      );
      res.json({ success: "Update successful!" });
    } catch (err) {
      return res.status(422).json({ error: "Server error!" });
    }
  },

  async updateUserCvFunction(req, res) {
    try {
      const { _id } = req.body;
      const uCv = req.file.filename;

      const previousCv = await User.findOne({ _id }, { uCv: 1 });

      if (previousCv.uCv) {
        const cvPath = `../client//public//files//usercv//${previousCv.uCv}`;
        fs.unlinkSync(cvPath);
      }

      const updateUserCv = await User.updateOne(
        { _id },
        {
          $set: {
            uCv,
          },
        }
      );
      res.json({ success: "Update successful!" });
    } catch (err) {
      return res.status(422).json({ error: "Server error!" });
    }
  },

  async searchUsersFunction(req, res) {
    try {
      const { inputName } = req.body;
      const user = await User.find(
        {
          uName: { $regex: inputName, $options: "i" },
        },
        { uName: 1, uPropic: 1 }
      );
      res.send(user);
    } catch (err) {
      return res.status(422).json({ error: "Server error!" });
    }
  },
};
