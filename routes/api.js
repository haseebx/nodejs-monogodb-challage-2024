const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const cars = require('../controllers/cars');

router.use('/user', user);
router.use('/cars', cars);

module.exports = router;
