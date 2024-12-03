const express = require('express');
const router = express.Router();
const user = require('../routeHandlers/user');


router.post('/login', (req, res) => {
  user.login(req, res);
});


module.exports = router;
