const express = require("express");
const authController = require("../../controllers/users");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.post("/register", authController.addUser);

router.post("/login", authController.loginUser);

router.post("/logout", authenticate, authController.logoutUser);

router.get("/current", authenticate, authController.currentUser);

module.exports = router;
