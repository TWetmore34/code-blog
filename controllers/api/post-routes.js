const router = require('express').Router();
const { Post } = require('../../models');

// find all posts
router.get('/', async (req, res) => {
    const postData = await Post.findAll();
    const posts = postData.map((post) => post.get({ plain: true }))
    res.json(posts)
})
// create new post
router.post('/', async (req, res) => {
    let newPost = {
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id
    };
    console.log(newPost)
    Post.create(newPost);
    res.status(201).json({newPost})
});

module.exports = router;