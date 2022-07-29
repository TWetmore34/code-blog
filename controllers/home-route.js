const router = require('express').Router();
const { Post, User, Comment } = require('../models')
const withAuth = require('../utils/auth')

router.get('/', withAuth, async (req, res) => {
    const postsData = await Post.findAll({
        include:[{ model: User, attributes: ['name', 'id'] }, { model: Comment}]
    })
    const posts = postsData.map(post => post.get({ plain: true }))
    console.log(req.session)
    res.render('homepage', { posts });
});

router.get('/post/:id', async (req, res) => {
    const postData = await Post.findByPk(req.params.id, {
        include: [{ model: User }, { model: Comment, 
            include: {model: User } }]
    });
    const post = postData.get({ plain: true })
    console.log(post.Comments)
    res.render('post-view', { post })
});

// get request for login
router.get('/login', (req,res) => {
    res.render('login')
});


module.exports = router;