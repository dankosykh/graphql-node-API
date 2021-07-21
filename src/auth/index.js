const jwt = require("jsonwebtoken");

const generateToken = ({ user_id, username }, secret, expiration = "1h") => {
  const token = jwt.sign(
    {
      user_id,
      username,
    },
    secret,
    { expiresIn: expiration }
  );
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

module.exports = { generateToken, verifyToken };
