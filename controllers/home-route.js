const router = require('express').Router();
const { Post, User, Comment } = require('../models')

// TODO: how can i prevent this from sending a password?
router.get('/', async (req, res) => {
    const postsData = await Post.findAll({
        include:[{ model: User, attributes: ['name', 'id'] }, { model: Comment }]
    })
    const posts = postsData.map(post => post.get({ plain: true }))
    console.log(posts)
    res.render('homepage', { posts });
});

router.get('/post/:id', async (req, res) => {
    const postData = await Post.findByPk(req.params.id, {
        include: [{ model: User }, { model: Comment }]
    });
    const post = postData.get({ plain: true })
    console.log(post)
    res.render('post-view', { post })
});

module.exports = router;