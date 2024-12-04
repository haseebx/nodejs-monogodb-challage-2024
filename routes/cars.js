const express = require("express");
const router = express.Router();
const cars = require("../routeHandlers/cars");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/create",authenticateToken, (req, res) => {
  cars.create(req, res);
});

module.exports = router;
