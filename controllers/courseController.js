const Course = require("../models/Course");
const { connectToDB } = require("../utils/database");

// Controller function to create a new course
exports.createCourse = async (req, res) => {
  const { title, description, instructor, duration, img } = req.body;
  await connectToDB();

  try {
    const newCourse = new Course({
      title,
      description,
      instructor,
      duration,
      img,
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
};

// Controller function to get all courses
exports.getAllCourses = async (req, res) => {
  await connectToDB();
  try {
    const courses = await Course.find();
    res.json({ courses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
  }
};

// Controller function to get a single course by ID
exports.getCourseById = async (req, res) => {
  const courseId = req.params.courseId;
  await connectToDB();

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
};

// Controller function to add module with video and/or assignment to a course
exports.addModuleToCourse = async (req, res) => {
  await connectToDB();
  const courseId = req.params.courseId;
  console.log(courseId);
  const { moduleTitle, videosArray, assignments } = req.body;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const newModule = {
      title: moduleTitle,
      videos: videosArray,
    };

    console.log(assignments);
    console.log(videosArray);
    console.log(moduleTitle);

    if (assignments) {
      const newAssignment = assignments;
      newModule.assignments = newAssignment;
    }

    course.modules.push(newModule);

    await course.save();
    console.log(course);
    res.json({
      message: "Module with video and/or assignment added successfully",
      course,
    });
  } catch (error) {
    // res.status(500).json({
    //   message: "Error adding module with video and/or assignment",
    //   error: error,
    // });
    res.send(error);
  }
};

// Controller for adding resources to a course
exports.addResourceToCourse = async (req, res) => {
  await connectToDB();
  const courseId = req.params.courseId;
  console.log(courseId);
  const { resources } = req.body;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Add the resources to the course
    course.resources = resources;

    await course.save();
    console.log(course);
    res.json({
      message: "Resources added to the course successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding resources to the course",
      error: error,
    });
  }
};

exports.addModuleToCourse = async (req, res) => {
  await connectToDB();
  const courseId = req.params.courseId;
  console.log(courseId);
  const { moduleTitle, videosArray, assignments } = req.body;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const newModule = {
      title: moduleTitle,
      videos: videosArray,
    };

    console.log(assignments);
    console.log(videosArray);
    console.log(moduleTitle);

    if (assignments) {
      const newAssignment = assignments;
      newModule.assignments = newAssignment;
    }

    course.modules.push(newModule);

    await course.save();
    console.log(course);
    res.json({
      message: "Module with video and/or assignment added successfully",
      course,
    });
  } catch (error) {
    // res.status(500).json({
    //   message: "Error adding module with video and/or assignment",
    //   error: error,
    // });
    res.send(error);
  }
};

exports.addMCQsToAssignment = async (req, res) => {
  await connectToDB();
  const courseId = req.params.courseId;
  const moduleId = req.params.moduleId; // Assuming you have moduleId in your route
  const assignmentIndex = req.params.assignmentIndex; // Assuming you have assignmentIndex in your route
  const mcqsData = req.body.mcqsData; // Assuming mcqsData is an array of MCQs
  console.log(mcqsData);

  try {
    const course = await Course.findById(courseId);
    console.log(course);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const module = course.modules.id(moduleId);
    console.log(module);

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    const assignment = module.assignments[assignmentIndex];
    console.log(assignment);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Iterate over each MCQ in mcqsData array
    mcqsData.forEach((mcqData) => {
      const { questionText, options, correctAnswer } = mcqData;

      const newMCQ = {
        questionText,
        questionType: "MCQ",
        options,
        correctAnswer,
      };

      assignment.questions.push(newMCQ);
    });

    await course.save();

    res.json({ message: "MCQs added to assignment successfully", course });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding MCQs to assignment",
      error: error.message,
    });
  }
};
