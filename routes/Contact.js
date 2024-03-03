const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const { connectToDB } = require("../utils/database");

router.get("/", async (req, res) => {
  await connectToDB();
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  await connectToDB();
  const { name, email, subject, message } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
