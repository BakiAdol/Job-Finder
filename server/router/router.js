const express = require("express");
const router = express.Router();
const {
  registerFunction,
  loginFunction,
  logoutFunction,
} = require("../controllers/authControllers");

// register
router.post("/register", registerFunction);

// login
router.post("/login", loginFunction);

// logout
router.get("/logout", logoutFunction);

module.exports = router;
