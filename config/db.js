const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.mongooseUri, { dbName: process.env.dbName })
      .then((res) => {
        console.log(
          "DataBase Connected successfully with " + process.env.dbName,
        );
      });
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
