const express = require("express");
const router = express.Router();
const {
  registerFunction,
  loginFunction,
  logoutFunction,
  loggendInFunction,
  getUserFunction,
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

module.exports = router;
