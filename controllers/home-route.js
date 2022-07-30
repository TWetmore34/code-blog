const router = require('express').Router();
const { Session } = require('express-session');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth')

// get all posts
router.get('/', async (req, res) => {
    // include comment and user w attributes name and id,
    const postsData = await Post.findAll({
        include:[{ model: User, attributes: ['name', 'id'] }, { model: Comment}]
    })
    const posts = postsData.map(post => post.get({ plain: true }))
    let sessionId = req.session
    console.log(sessionId)
    // render to home page
    res.render('homepage', { posts, sessionId });
});

// get single post
router.get('/post/:id', async (req, res) => {
    const postData = await Post.findByPk(req.params.id, {
        include: [{ model: User }, { model: Comment, 
            include: {model: User } }]
    });
    const post = postData.get({ plain: true })
    const session = req.session
    console.log(post)
    res.render('post-view', { post, session })
});

// sinlge post view for update
router.get('/post/update/:id', async (req, res) => {
    const postData = await Post.findByPk(req.params.id, {
        include: [{ model: User }, { model: Comment, 
            include: {model: User } }]
    });
    const post = postData.get({ plain: true })
    console.log(post)

    const session = req.session
    if(session.user_id !== post.user_id){
        res.redirect('/login')
    } else {
    res.render('postUpdate', { post, session })
    }
});

// get request for login
router.get('/login', (req,res) => {
    res.render('login')
});

// get request for dashboard
router.get('/dashboard', withAuth, async (req,res) => {
    const userData = await User.findByPk(req.session.user_id, {
        include: [{model: Post}]
    })
    const user = await userData.get({ plain: true })
    res.render('dashboard', user)
});

module.exports = router;