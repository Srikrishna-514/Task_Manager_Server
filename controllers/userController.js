const { userModel } = require("../models/authModel.js");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { cloudinaryfileUpload } = require("../utils/cloudinary.js");
const profileController = async (req, res) => {
  try {
    console.log(req.userInfo._id);

    const user = await userModel.findById({ _id: req.userInfo._id });
    console.log(user);
    res.status(200).json({ info: user });
  } catch (error) {
    next(error);
  }
};
const editProfile = async (req, res, next) => {
  try {
    const { name, username, password, email } = req.body;

    const profileImage = req.file;

    const fileUrl = await cloudinaryfileUpload(profileImage.path);
    fs.unlinkSync(profileImage.path);

    const hashPass = bcrypt.hashSync(password, 12);

    const edituser = await userModel.findByIdAndUpdate(
      req.userInfo._id,
      {
        $set: {
          name,
          username,
          password: hashPass,
          email,
          imageUrl: fileUrl,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    // console.log(edituser);

    return res.status(200).json({
      msg: "Profile updated successfully",
      info: edituser,
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
module.exports = { profileController, editProfile };
