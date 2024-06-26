const express = require("express");
const postsController = require("./postsController");
const router = express.Router();

router.post("/", postsController.createPost);
router.get("/", postsController.getPosts);
router.put("/:id", postsController.updatePost);
router.delete("/:id", postsController.deletePost);

const postsRouter = router;
module.exports = postsRouter;