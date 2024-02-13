const Resource = require("../models/Resource");
const { connectToDB } = require("../utils/database");

// Controller method to create a new resource
exports.createResource = async (req, res) => {
  await connectToDB();

  try {
    const { title, description, type, name } = req.body;
    console.log(title);

    // Create a new resource
    const resource = new Resource({
      title,
      description,
      type,
      name,
    });

    // Save the resource to the database
    const savedResource = await resource.save();

    res.status(201).json(savedResource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller method to get all resources
exports.getAllResources = async (req, res) => {
  await connectToDB();

  try {
    // Fetch all resources from the database
    const resources = await Resource.find();

    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
