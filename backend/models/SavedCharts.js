const mongoose = require("mongoose");

const savedChartsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fileName: String,
  xAxis: String,
  yAxis: String,
  zAxis: String,
  chartType: String,
  color: String,
  chartTitle: String,
  chartData: Object,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SavedCharts", savedChartsSchema);
