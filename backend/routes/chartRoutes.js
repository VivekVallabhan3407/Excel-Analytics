const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const SavedChart = require("../models/SavedCharts");

// Save Chart
router.post("/save-chart", auth, async (req, res) => {
  try {
    const newChart = new SavedChart({ userId: req.user._id, ...req.body });
    await newChart.save();
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { charts: 1 }
    });
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

router.delete("/:id", auth, async (req, res) => {
  try {
    await SavedChart.findByIdAndDelete(req.params.id);
    res.json({ message: "Chart deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete chart" });
  }
});

module.exports = router;
