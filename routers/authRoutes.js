const express = require("express");
const {
  signinValidation,
  loginValidation,
} = require("../validators/authValidator.js");
const {
  signinController,
  loginController,
} = require("../controllers/authController.js");
const router = express.Router();
router.post("/signin", signinValidation, signinController);
router.post("/login", loginValidation, loginController);
module.exports = router;
