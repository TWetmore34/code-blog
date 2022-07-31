const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all posts
router.get('/', async (req, res) => {
    // include comment and user w attributes name and id
    const postsData = await Post.findAll({
        include:[{ model: User, attributes: ['name', 'id'] }, { model: Comment}]
    })
    // serialize dataset
    const posts = postsData.map(post => post.get({ plain: true }))
    // makes sure we can send the session obj
    let session = req.session
    // render to home page
    res.render('homepage', { posts, session });
});

// get single post
router.get('/post/:id', async (req, res) => {
    // find selected post
    const postData = await Post.findByPk(req.params.id, {
        include: [{ model: User }, { model: Comment, 
            include: {model: User } }]
    });
    // serialize
    const post = postData.get({ plain: true })
    const session = req.session
    // render user res
    res.render('post-view', { post, session })
});

// sinlge post view for update
router.get('/post/update/:id', async (req, res) => {
    // find requested post for update
    const postData = await Post.findByPk(req.params.id, {
        include: [{ model: User }, { model: Comment, 
            include: {model: User } }]
    });
    const post = postData.get({ plain: true })

    const session = req.session
    // last check to make sure users can only edit their posts
    if(session.user_id !== post.user_id){
        res.redirect('/login')
    } else {
        // render the page for post update
        res.render('postUpdate', { post, session })
    }
});

// get request for login
router.get('/login', (req,res) => {
    res.render('login')
});

// get request for dashboard
router.get('/dashboard', withAuth, async (req,res) => {
    // grabs user from db
    const userData = await User.findByPk(req.session.user_id, {
        include: [{model: Post}]
    })
    // send user data for page render
    const user = await userData.get({ plain: true })
    res.render('dashboard', user)
});

module.exports = router;