const express = require('express');
const router = express.Router();
const user = require('./user');
const cars = require('./cars');

router.use('/user', user);
router.use('/cars', cars);

module.exports = router;
