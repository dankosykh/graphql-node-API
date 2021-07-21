const jwt = require("jsonwebtoken");
const { UserModel } = require("../db");

const generateToken = ({ user_id, username }, secret, expiration = "1h") => {
  const token = jwt.sign({ user_id, username }, secret, {
    expiresIn: expiration,
  });
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

const authenticated = (context, next) => {
  if (!context.username) {
    throw new Error("Authenticated Error");
  }
  return next();
};

const isUniqueField = (field) => {
  return new Promise((resolve, reject) => {
    console.log(field);
    UserModel.fimdOneUser(db, field)
      .then((data) => {
        console.log("i unique field: " + data);
        // if (data !== null) {
        //   reject();
        // }
        // resolve();
      })
      .catch((data) => {
        throw new Error("DB error on sign up");
      });
  });
};

module.exports = {
  generateToken,
  verifyToken,
  getUserContent,
  authenticated,
  isUniqueField,
};
