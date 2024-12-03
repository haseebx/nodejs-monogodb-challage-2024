const User = require('../models/user');
const userService = require('../services/userService');



exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ message: 'This email is not registered.' });
      return;
    }
return
  } catch (error) {
    res.status(400).send({ message: 'Something went wrong' });
  }
};

