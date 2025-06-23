
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
      size: req.file.size, // Store the size of the file
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


exports.getAllUploadedFiles = async (req, res) => {
  try {
    const files = await ExcelRecord.find({ userId: req.user._id }).select('fileName');
    const fileNames = files.map(f => f.fileName);
    res.json(fileNames);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching uploaded files' });
  }
};

exports.getColumnsByFileName = async (req, res) => {
  const { fileName } = req.params;

  try {
    const record = await ExcelRecord.findOne({ 
      userId: req.user._id,
      fileName
    });

    if (!record || !record.content || record.content.length === 0) {
      return res.status(404).json({ message: 'File content not found' });
    }

    const firstRow = record.content[0];
    const columns = Object.keys(firstRow);
    
    res.status(200).json(columns);
  } catch (err) {
    console.error('Error fetching columns:', err);
    res.status(500).json({ message: 'Failed to retrieve columns' });
  }
};

// In uploadController.js
exports.getFileMeta = async (req, res) => {
  try {
    const userId = req.user._id;
    const files = await ExcelRecord.find({ userId });

    const total = files.length;
    const recent = files.map(file => ({
      fileName: file.fileName,
      size: Buffer.byteLength(JSON.stringify(file.content)),
    }));

    res.json({ total, recent });
  } catch (err) {
    console.error('Failed to get file metadata:', err);
    res.status(500).json({ message: 'Server error' });
  }
};