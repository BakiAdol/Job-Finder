const express = require("express");
const router = express.Router();
const {
  registerFunction,
  loginFunction,
} = require("../controllers/authControllers");

// routers
router.post("/register", registerFunction);

router.post("/login", loginFunction);

module.exports = router;
