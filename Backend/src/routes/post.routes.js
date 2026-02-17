const express = require('express');
const postController = require('../controllers/post.controller');
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

const postRouter = express.Router();

postRouter.post('/',upload.single('image'),postController.createPostController);

module.exports = postRouter