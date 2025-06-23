
const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");
const ExcelRecord = require("../models/ExcelRecord");

exports.uploadFile = async (req, res) => {
 
  if (!req.file) {
    console.log('No file received');
    return res.status(400).json({ message: 'No file uploaded' });
  }
  try {
  

    const filePath = path.join(__dirname, "../uploads", req.file.filename);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    const newRecord = new ExcelRecord({
      userId: req.user._id,
      fileName: req.file.originalname,
      content: jsonData,
    });

    await newRecord.save();
    fs.unlinkSync(filePath); // remove file from disk after processing

    res.status(201).json({
      message: "File uploaded successfully",
      record_id: newRecord._id,
      rowCount: jsonData.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while uploading file" });
  }
};

exports.getRecordById = async (req, res) => {
  try {
    const record = await ExcelRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({
      message: "Record retrieved successfully",
      data: record.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while retrieving record" });
  }
};
