const bcrypt = require("bcrypt");

exports.hash = async (password) => {
  return await bcrypt.hash(password, 10);
};

exports.compare = async (plain, hashed) => {
  return await bcrypt.compare(plain, hashed);
};
