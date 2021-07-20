const crypto = require("crypto");
const DIGEST = "sha512";

const createSalt = () => {
  return crypto.randomBytes(16).toString("base64");
};

const hash = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 100, 64, DIGEST).toString("base64");
};

module.exports = {
  createSalt,
  hash,
};
