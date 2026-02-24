const express = require('express');
const userModel = require("../model/user.model");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware")

const authrouter = express.Router();

authrouter.post('/register',authController.registerController);
authrouter.post('/login', authController.loginController);
authrouter.get('/get-me',authMiddleware,authController.getMeController)
module.exports = authrouter;