const express = require("express");
const router = express.Router();
const {
  registerFunction,
  loginFunction,
  logoutFunction,
  loggendInFunction,
} = require("../controllers/authControllers");

// register
router.post("/register", registerFunction);

// login
router.post("/login", loginFunction);

// logout
router.get("/logout", logoutFunction);

// loggedIn
router.get("/loggedin", loggendInFunction);

module.exports = router;
