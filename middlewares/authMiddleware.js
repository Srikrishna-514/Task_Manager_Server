const jwt = require("jsonwebtoken");
const { userModel } = require("../models/authModel.js");
require("dotenv").config();

const checkAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        msg: "Authorization header is missing",
      });
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      const err = new Error("Invalid authorization scheme");
      err.statusCode = 400;
      return next(err);
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel
      .findById(decodeToken.id)
      .select("-password -createdAt -updatedAt -__v");

    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "User not found or token is invalid",
      });
    }

    req.userInfo = user;

    // 6. Continue only after authentication succeeds
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        msg: "Token has expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        msg: "Invalid token",
      });
    }

    return next(error);
  }
};
const checkRoles = (...roles) => {
  return async (req, res, next) => {
    try {
      const checkUser = req.userInfo;

      // console.log(role);
      const data = await userModel.findById(req.userInfo._id).select("role");
      // console.log(data);

      if (roles.includes(data.role)) {
        next();
      } else {
        res.status(403).json({ msg: `only ${roles.join(",")} can access` });
      }
    } catch (error) {
      res.json({ msg: error.message });
    }
  };
};
module.exports = { checkAuth, checkRoles };
