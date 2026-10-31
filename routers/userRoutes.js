const express = require("express");
const { upload } = require("../utils/multerfileUpload.js");
const { checkAuth } = require("../middlewares/authMiddleware.js");
const {
  profileController,
  editProfile,
} = require("../controllers/userController.js");
const {
  tokenValidation,
  editValidation,
  validationMiddleware,
} = require("../validators/authValidator.js");

const router = express.Router();
router.get(
  "/profile/",
  tokenValidation,
  validationMiddleware,
  checkAuth,
  profileController,
);
router.put(
  "/editprofile",
  tokenValidation,
  validationMiddleware,
  checkAuth,
  editValidation,
  upload.single("profilePic"),
  editProfile,
);
module.exports = router;
