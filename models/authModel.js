const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      required: true,
      default: "employee",
      enum: ["manager", "employee"],
    },

    imageUrl: {
      type: String,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("user", userSchema);
module.exports = { userModel };
