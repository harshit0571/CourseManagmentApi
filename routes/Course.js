const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.post("/", courseController.createCourse);
router.get("/", courseController.getAllCourses);
router.get("/:courseId", courseController.getCourseById);
router.post("/:courseId/modules", courseController.addModuleToCourse);

module.exports = router;
