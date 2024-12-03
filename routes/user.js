const express = require('express');
const router = express.Router();
const auth = require('../services/authenticateToken');
const user = require('../routeHandlers/user');


router.post('/login', (req, res) => {
  user.login(req, res);
});


module.exports = router;