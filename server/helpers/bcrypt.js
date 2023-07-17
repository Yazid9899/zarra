const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  const saltz = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, saltz);
};

const comparePassword = (inputPassword, userPassword) => {
  return bcrypt.compareSync(inputPassword, userPassword);
};

module.exports = { hashPassword, comparePassword };
