const jwt = require("jsonwebtoken");

const generateToken = ({ user_id, email }) => {
  return jwt.sign(
    {
      user_id,
      email,
    },
    process.env.SECRET,
    { expiresIn: "1h" }
  );
};

const verifyToken = (token) => {};

console.log(generateToken({ user_id: 4, email: "dk@getMaxListeners.com" }));
