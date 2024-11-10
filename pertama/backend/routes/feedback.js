const express = require("express");
const router = express.Router();
const {
  getAllFeedback,
  storeFeedback,
} = require("../controllers/feedbackController");

router.get("/", getAllFeedback);

router.post("/", storeFeedback);

module.exports = router;
