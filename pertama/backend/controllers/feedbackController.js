const { Feedback } = require("../models");
const { Op } = require("sequelize");

exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll();
    return res.status(200).json({
      status: "success",
      data: feedbacks,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.storeFeedback = async (req, res) => {
  try {
    // Validate the request body
    const { name, email, message, photo } = req.body;

    // Check if required fields are present
    if (!name || !email || !message) {
      return res.status(400).json({
        status: "error",
        message: "Name, email, and message are required fields.",
      });
    }

    // Optional: Check if email format is valid
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid email format.",
      });
    }

    // Create new feedback in the database
    const newFeedback = await Feedback.create(req.body);

    return res.status(201).json({
      status: "success",
      data: newFeedback,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
