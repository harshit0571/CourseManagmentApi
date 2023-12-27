const express = require("express");
const Course = require("../models/Course");

const router = express.Router();

router.post("/courses", async (req, res) => {
  const { title, description, instructor, duration } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
      instructor,
      duration,
    });

    await newCourse.save();

    res
      .status(201)
      .json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating course", error: error.message });
  }
});

router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({ courses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
  }
});

router.get("/courses/:courseId", async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ course });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching course details", error: error.message });
  }
});

module.exports = router;
