const express = require('express');
const postController = require('../controllers/post.controller');
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });
const authMiddleware = require('../middlewares/auth.middleware');


const postRouter = express.Router();

postRouter.post('/',authMiddleware,upload.single('image'),postController.createPostController);
postRouter.get('/',authMiddleware,postController.getPostController);

postRouter.get('/details/:postId',authMiddleware,postController.getPostDetailsController);

postRouter.delete('/:postId',authMiddleware,postController.deletePostController);

module.exports = postRouter