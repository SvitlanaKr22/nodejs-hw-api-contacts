const express = require("express");
const authController = require("../../controllers/users");
const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.post("/register", authController.addUser);

router.get("/verify/:verificationToken", authController.verifyEmailUser);

router.post("/login", authController.loginUser);

router.post("/logout", authenticate, authController.logoutUser);

router.get("/current", authenticate, authController.currentUser);

router.patch("/", authenticate, authController.updateUser);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  authController.updateAvatar
);

module.exports = router;
