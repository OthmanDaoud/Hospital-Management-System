const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

router.get("/:doctorId", feedbackController.getDoctorFeedback);
router.get("/stars/:doctorId", feedbackController.avgstars);
router.post("/", feedbackController.createFeedback);

module.exports = router;
