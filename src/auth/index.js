const jwt = require("jsonwebtoken");
const { UserModel } = require("../db");

const generateToken = ({ user_id, username }, secret) => {
  const token = jwt.sign({ user_id, username }, secret);
  return token;
};

const verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};

const getUserContent = (token, secret, db) => {
  return verifyToken(token, secret)
    .then((decoded) =>
      UserModel.fimdOneUser(db, { username: decoded.username })
    )
    .catch((e) => null);
};

const authorized = () => {};

module.exports = { generateToken, verifyToken, getUserContent };
