const express = require("express");
const multer = require("multer");
const path = require("path");
const auth = require("../middleware/auth");
const uploadController = require("../controllers/uploadController");
const adminController = require("../controllers/adminController");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
router.get('/files', auth, uploadController.getAllUploadedFiles);
router.get('/columns/:fileName', auth, uploadController.getColumnsByFileName);
router.post("/upload", auth, upload.single("file"), uploadController.uploadFile);
router.get("/records/:id", auth, uploadController.getRecordById);
router.get("/meta", auth, uploadController.getFileMeta);
router.get("/record-by-name/:fileName", auth, uploadController.getRecordByFileName);
module.exports = router;
