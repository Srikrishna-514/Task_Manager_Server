const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token.js");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/authModel.js");
require("dotenv").config();
const signinController = async (req, res, next) => {
  try {
    const { name, username, password, email, role } = req.body;
    // console.log(password);
    const hashedPassword = bcrypt.hashSync(password, 12);
    // console.log(hashedPassword);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      username,
      role,
    });
    res.status(201).json({ msg: "signIn successfully ", info: user });
  } catch (error) {
    next(error);
  }
};
const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({
      email,
    });
    // console.log(user);

    if (!user) {
      return res.status(400).json({ msg: "User-Not-found" });
    }
    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({ msg: "Invalid Email or password" });
    }

    const token = await generateToken(user);
    // console.log(token);

    res.status(200).json({
      msg: "login successfully",
      info: {
        name: user.name,
        username: user.username,
        email: user.email,
        id: user._id,
      },
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { signinController, loginController };
