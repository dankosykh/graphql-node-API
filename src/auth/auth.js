const jwt = require("jsonwebtoken");

const generateToken = ({ username, email }) => {
  return jwt.sign(
    {
      username,
      email,
    },
    process.env.SECRET,
    { expiresIn: "1h" }
  );
};

const verifyToken = (token) => {};

console.log(generateToken({ username: 4, email: "dk@getMaxListeners.com" }));
