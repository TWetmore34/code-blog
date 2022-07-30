const router = require('express').Router();
const { Post } = require('../../models');
const timeoutCheck = require('../../utils/timeoutLogin')

// find all posts as json (for testing)
router.get('/', async (req, res) => {
    const postData = await Post.findAll();
    const posts = postData.map((post) => post.get({ plain: true }))
    res.json(posts)
});

// create new post
router.post('/', timeoutCheck, async (req, res) => {
    let newPost = {
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id
    };
    console.log(newPost)
    Post.create(newPost);
    res.status(201).json({newPost})
});

// delete a post
router.delete('/:id', async (req, res) => {
    try{
    const deleted = await Post.destroy({where: {id: req.params.id}});
    if(!deleted) {
        return res.status(404).json({ msg: 'Failed to delete' })
    }
    res.status(200).json(deleted);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// update a post (probably do this one on single post view)
router.put('/:id', async (req, res) => {
    try {
        const updatedPost = {
            title: req.body.title,
            post_content: req.body.post_content
        }
        const updated = await Post.update(updatedPost, {
            where: {
                id: req.params.id
            }
        })
        console.log(updated)
        res.status(200).json({ msg: updated })
    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;