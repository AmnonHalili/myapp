const exprss = require('express');
const router = exprss.Router();

const postsController = require('../controllers/posts_controller');

router.get("/", postsController.getAllposts);

router.post("/",postsController.createPost);

router.delete("/", postsController.deletePost);

module.exports = router;