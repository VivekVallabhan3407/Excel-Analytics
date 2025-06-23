const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const SavedChart = require("../models/SavedCharts");

// Save Chart
router.post("/save-chart", auth, async (req, res) => {
  try {
    const newChart = new SavedChart({ userId: req.user._id, ...req.body });
    await newChart.save();
    res.status(201).json({ message: "Chart saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to save chart" });
  }
});

// Get All User Charts
router.get("/user-charts", auth, async (req, res) => {
  try {
    const charts = await SavedChart.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(charts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch charts" });
  }
});

module.exports = router;
