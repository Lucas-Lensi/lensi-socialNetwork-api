const express = require('express');
const router = express.Router();

const PostController = require('../Controllers/post.controller');

router.post('/create', PostController.createPost);
router.get('/all', PostController.getPosts);

module.exports = router;