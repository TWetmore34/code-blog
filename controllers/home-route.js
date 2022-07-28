const router = require('express').Router();
const { Post, User } = require('../models')

// TODO: how can i prevent this from sending a password?
router.get('/', async (req, res) => {
    const posts = await Post.findAll({
        include: { model: User }
    })
    res.status(200).json(posts)
})

module.exports = router;