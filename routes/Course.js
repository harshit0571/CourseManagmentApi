const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.post("/", courseController.createCourse);
router.get("/", courseController.getAllCourses);
router.get("/:courseId", courseController.getCourseById);
router.post("/:courseId/modules", courseController.addModuleToCourse);
router.post("/:courseId/resources", courseController.addResourceToCourse);
router.post(
  "/:courseId/:moduleId/:assignmentIndex",
  courseController.addMCQsToAssignment
);

// DELETE assignments
router.delete(
  "/:courseId/modules/:moduleId/assignments",
  courseController.deleteFirstAssignment
);

module.exports = router;
