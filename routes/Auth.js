const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Register a new user
router.post("/register", authController.registerUser);

// Login user
router.post("/login", authController.loginUser);

router.get("/check-login", authController.isLoggedIn);

module.exports = router;
