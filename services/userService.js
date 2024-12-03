
const bcrypt = require('bcrypt');

// Authenticate user given password
exports.authenticate = (pwd, dbPwd) => {
  return bcrypt.compareSync(pwd, dbPwd);
};
