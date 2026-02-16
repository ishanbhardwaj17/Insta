const express = require('express');
const userModel = require("../model/user.model");
const authController = require("../controllers/auth.controller");

const authrouter = express.Router();

authrouter.post('/register',authController.registerController);
authrouter.post('/login', authController.loginController);

module.exports = authrouter;