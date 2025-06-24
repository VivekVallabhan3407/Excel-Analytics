const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const SavedChart = require("../models/SavedCharts");
const User = require("../models/User"); 

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
    const chart = await SavedChart.findById(req.params.id);

    if (!chart) {
      return res.status(404).json({ message: "Chart not found" });
    }

    if (chart.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this chart" });
    }

    await SavedChart.findByIdAndDelete(req.params.id);

    // Decrement chart count for user
    await User.findByIdAndUpdate(req.user._id, { $inc: { charts: -1 } });

    res.json({ message: "Chart deleted successfully" });
  } catch (err) {
    console.error("Chart deletion error:", err);
    res.status(500).json({ message: "Failed to delete chart" });
  }
});

module.exports = router;
