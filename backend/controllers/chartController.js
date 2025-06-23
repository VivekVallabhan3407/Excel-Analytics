const Chart = require("../models/SavedCharts");

exports.saveChart = async (req, res) => {
  try {
    const newChart = new Chart({
      userId: req.user._id,
      fileName: req.body.fileName,
      xAxis: req.body.xAxis,
      yAxis: req.body.yAxis,
      chartType: req.body.chartType,
      chartConfig: req.body.config,
    });
    await newChart.save();
    res.status(201).json({ message: "Chart saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving chart" });
  }
};

exports.getUserCharts = async (req, res) => {
  try {
    const charts = await Chart.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(charts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching charts" });
  }
};

exports.getChartCount = async (req, res) => {
  try {
    const count = await Chart.countDocuments({ userId: req.user._id });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Error getting chart count" });
  }
};
