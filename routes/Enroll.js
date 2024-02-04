const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollmentController");

// Enroll in a course
router.post("/:courseId", enrollmentController.enrollInCourse);

module.exports = router;
