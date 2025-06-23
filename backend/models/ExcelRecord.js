const mongoose = require('mongoose');

const excelRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  content: {
    type: Array,
    required: true,
  },
  size:{
    type: Number,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('ExcelRecord', excelRecordSchema);
