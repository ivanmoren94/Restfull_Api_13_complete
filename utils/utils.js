
const jwt = require("jsonwebtoken");

const generateToken = (user, isRefreshToken) => {
    if (isRefreshToken) {
      return jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "3m",
      });
    }
  
    return jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: "1m" });
  };

module.exports = {  generateToken };