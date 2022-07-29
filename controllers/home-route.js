const router = require('express').Router();
const { Post, User, Comment } = require('../models')
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
    const postsData = await Post.findAll({
        include:[{ model: User, attributes: ['name', 'id'] }, { model: Comment}]
    })
    const posts = postsData.map(post => post.get({ plain: true }))
    let sessionId = req.session
    console.log(sessionId)
    res.render('homepage', { posts, sessionId });
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

router.get('/dashboard', withAuth, (req,res) => {
    console.log(req.session)
    res.render('dashboard', req.session)
})


module.exports = router;