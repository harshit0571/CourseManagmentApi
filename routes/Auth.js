const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Register a new user
router.post("/register", authController.registerUser);

// Login user
router.post("/login", authController.loginUser);

router.get("/check-login", authController.isLoggedIn);

router.get("/logout", authController.logout);

router.post("/forget", authController.forgotPassword);

router.post("/updatepassword", authController.updatePassword);

module.exports = router;
