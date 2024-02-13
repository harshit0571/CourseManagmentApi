const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resourceController");

// Enroll in a course
router.post("/", resourceController.createResource);
router.get("/", resourceController.getAllResources);

module.exports = router;
