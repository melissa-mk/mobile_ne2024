const express = require('express');
const commentsController = require('./commentsController');
const router = express.Router();

router.post('/posts/:postId', commentsController.createComment);
router.get('/posts/:postId/comments', commentsController.getComments);
router.get('/posts/:postId/:commentId', commentsController.getCommentById);
router.put('/posts/:postId/:commentId', commentsController.updateComment);
router.delete('/posts/:postId/:commentId', commentsController.deleteComment);

const commentsRouter = router;
module.exports = commentsRouter;