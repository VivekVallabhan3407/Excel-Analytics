const Chart = require("../models/SavedCharts");

exports.saveChart = async (req, res) => {
  try {
    const newChart = new Chart({
      userId: req.user._id,
      fileName: req.body.fileName,
      xAxis: req.body.xAxis,
      yAxis: req.body.yAxis,
      zAxis: req.body.zAxis || null, 
      chartType: req.body.chartType,
      chartTitle: req.body.chartTitle,
      color: req.body.color,
      chartData: req.body.chartData,
    });
    console.log("User from token:", req.user);
    console.log("Chart request body:", req.body);
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

exports.getChartTypeStats = async (req, res) => {
  try {
    const stats = await Chart.aggregate([
      { $group: { _id: "$chartType", count: { $sum: 1 } } }
    ]);
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ message: "Error fetching chart type stats" });
  }
};
