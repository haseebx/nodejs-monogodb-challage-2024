const express = require('express');
const router = express.Router();
const user = require('../services/user');


router.post('/login', (req, res) => {
  user.login(req, res);
});

router.all("*", (req, res) => {
  return res.status(404).json("Not Found");
});


module.exports = router;
