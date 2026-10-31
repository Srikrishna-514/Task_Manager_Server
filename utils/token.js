require("dotenv").config();
const jwt = require("jsonwebtoken");
async function generateToken(user, req, res, next) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is missing");

      return res.status(500).json({
        msg: "Internal server error",
      });
    }
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24hr",
    });
    return token;
    // console.log(token);
  } catch (error) {
    next(error);
  }
}
module.exports = { generateToken };
