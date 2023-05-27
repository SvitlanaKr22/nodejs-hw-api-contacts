const express = require("express");
const authController = require("../../controllers/users");

const router = express.Router();

router.post("/register", authController.addUser);

router.post("/login", authController.loginUser);

module.exports = router;
