const express = require("express");
const router = express.Router();
const multer = require("multer");
const cars = require("../services/cars");
const authenticateToken = require("../middleware/authMiddleware");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/create", authenticateToken, (req, res) => {
  cars.create(req, res);
});

router.post("/upload", upload.single("file"), (req, res) => {
  console.log({ XX: req.file });

  cars.uploadImage(req, res);
});

router.get("/getAll", authenticateToken, (req, res) => {
  cars.getAll(req, res);
});

router.all("*", (req, res) => {
  return res.status(404).json("Not Found");
});

module.exports = router;
