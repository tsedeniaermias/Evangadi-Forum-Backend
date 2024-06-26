const express = require("express");
const router = express.Router();

//* authontication middleware

const authMiddleware = require('../middleware/authMiddleware')

//* User controllers

const { register, login, checkUser } = require("../controller/userController");

//* register route
router.post("/register", register);

//* login user
router.post("/login", login);

//* check user
router.get("/check",authMiddleware, checkUser);

module.exports = router;
