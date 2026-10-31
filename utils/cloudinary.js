const { v2 } = require("cloudinary");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function cloudinaryfileUpload(file) {
  const uploadResult = await cloudinary.uploader
    .upload(file)
    .catch((err) => console.log(err));
  return uploadResult.url;
}
module.exports = { cloudinaryfileUpload };
