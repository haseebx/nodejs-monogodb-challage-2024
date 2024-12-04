const express = require("express");
const router = express.Router();
const multer = require("multer");
const cars = require("../services/cars");
const authenticateToken = require("../middleware/authMiddleware");

const storage = multer.memoryStorage(); // You can use diskStorage if required for local file storage
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // File size limit: 10 MB


router.post("/create",authenticateToken, (req, res) => {
  cars.create(req, res);
});

router.post("/upload", authenticateToken, upload.single("image"), (req, res) => {
    console.log({req});
    console.log("Multer processed file:", req.file);
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
    if (fileExtension === 'svg') {
        return res.status(400).json({ message: "SVG files are not allowed" });
    }
    cars.uploadImageToS3(req, res);
});

router.get("/getAll",authenticateToken, (req, res) => {
    cars.getAll(req, res);
  });
  

module.exports = router;
