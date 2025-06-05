const express=require("express");
const multer=require("multer");
const path=require("path");
const fs=require("fs");
const auth=require("../middleware/auth");
const ExcelRecord=require('../models/ExcelRecord')
const router=express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


const uplaod=multer({storage});

router.post("/upload",auth,uplaod.single("file"),async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = path.join(__dirname, "../uploads", req.file.filename);
    const workbook=xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);
    const newRecord = new ExcelRecord({
      userId: req.user._id,
      fileName: req.file.originalname,
      content: jsonData
    });

    await newRecord.save();
    fs.unlinkSync(filePath); // Delete the file after saving to the database

    res.status(201).json({
         message: "File uploaded successfully", 
         record_id: newRecord._id ,
         rowCount: jsonData.length,
        });
  }catch(err){
    console.error(err);
    res.status(500).json({ message: "Server error while uploading file" });
  }
});

router.get("/records/:id", auth, async (req, res) => {
    try{
        const record=await ExcelRecord.findById(req.params.id);
        if(!record){
            return res.status(404).json({ message: "Record not found" });

        }
        res.status(200).json({
            message: "Record retrieved successfully",
            data: record.data,});
    } catch (err) { 
        console.error(err);
        res.status(500).json({ message: "Server error while retrieving record" });
    }
});


module.exports=router;