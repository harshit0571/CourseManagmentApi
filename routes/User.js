const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/:username", userController.getUserByUsername);
router.get("/", userController.getUsers);

module.exports = router;
