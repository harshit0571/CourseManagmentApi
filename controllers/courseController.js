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
  const moduleId = req.params.moduleId;
  const assignmentIndex = req.params.assignmentIndex;
  const mcqsData = req.body.mcqsData;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const module = course.modules.id(moduleId);

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    console.log(module);

    let assignment = module.assignments[assignmentIndex];

    // If assignment doesn't exist, create a new one
    if (!assignment) {
      assignment = { title: " Assignment", type: "MCQ", questions: [] };
      module.assignments.push(assignment);
    }

    console.log(assignment);
    console.log(mcqsData);

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

exports.deleteFirstAssignment = async (req, res) => {
  await connectToDB();
  try {
    // Retrieve the course ID and module ID from request parameters
    const { courseId, moduleId } = req.params;

    // Find the course by ID
    const course = await Course.findById(courseId);

    // Check if the course exists
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find the module by ID
    const module = course.modules.id(moduleId);

    // Check if the module exists
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    // Check if the module has assignments
    if (module.assignments.length === 0) {
      return res
        .status(404)
        .json({ message: "No assignments found in the module" });
    }

    // Remove the 0th assignment from the module's assignments array
    module.assignments.shift();

    // Save the updated course
    await course.save();

    // Return a success response
    res.json({ message: "First assignment deleted successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error deleting first assignment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addVideosToModule = async (req, res) => {
  await connectToDB();
  const courseId = req.params.courseId;
  const moduleId = req.params.moduleId;
  const videosData = req.body.videosData;
  console.log(videosData);

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const module = course.modules.id(moduleId);
    console.log(module);

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    // Iterate over each video in videosData array
    videosData.forEach((videoData) => {
      const { title, url } = videoData;

      const newVideo = {
        title,
        url,
      };

      module.videos.push(newVideo);
    });

    await course.save();

    res.json({ message: "Videos added to module successfully", course });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding videos to module",
      error: error.message,
    });
  }
};

exports.deleteAllVideosFromModule = async (req, res) => {
  await connectToDB();
  try {
    // Retrieve the course ID and module ID from request parameters
    const { courseId, moduleId } = req.params;

    // Find the course by ID
    const course = await Course.findById(courseId);

    // Check if the course exists
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find the module by ID
    const module = course.modules.id(moduleId);

    // Check if the module exists
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    // Check if the module has videos
    if (module.videos.length === 0) {
      return res.status(404).json({ message: "No videos found in the module" });
    }

    // Remove all videos from the module's videos array
    module.videos = [];

    // Save the updated course
    await course.save();

    // Return a success response
    res.json({ message: "All videos deleted from the module successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error deleting all videos from module:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
