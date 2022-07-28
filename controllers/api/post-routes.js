const router = require('express').Router();
const { Post } = require('../../models');

// create new post
router.post('/', async (req, res) => {
    let newPost = {
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.body.user_id
    };
    Post.create(newPost);
    res.status(201).json({newPost})
})

module.exports = router;