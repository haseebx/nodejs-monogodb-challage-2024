const express = require('express');
const router = express.Router();
const user = require('../services/user');


router.post('/login', (req, res) => {
  user.login(req, res);
});


module.exports = router;
