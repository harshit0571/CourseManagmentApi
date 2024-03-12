const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollmentController");

// Enroll in a course
router.get("/:course/:username", (req, res) => {
  const courseId = req.params.course;
  const username = req.params.username;

  res.send("hi" + courseId + "d" + username);
});
router.post("/:courseid/:username", enrollmentController.enrollInCourse);

module.exports = router;
