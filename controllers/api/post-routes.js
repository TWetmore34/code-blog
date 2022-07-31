const router = require('express').Router();
const { Post } = require('../../models');
const timeoutCheck = require('../../utils/timeoutLogin')

// find all posts as json (for testing)
// router.get('/', async (req, res) => {
//     const postData = await Post.findAll();
//     const posts = postData.map((post) => post.get({ plain: true }))
//     res.json(posts)
// });

// create new post
router.post('/', timeoutCheck, async (req, res) => {
    // grab req.body for newPost
    let newPost = {
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id
    };
    // commit to db
    Post.create(newPost);
    res.status(201).json({newPost})
});

// delete a post
router.delete('/:id', async (req, res) => {
    try{
        // destroy post where id === req.params.id
    const deleted = await Post.destroy({where: {id: req.params.id}});
    // check for success
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
        // updated post grabs from req.body
        const updatedPost = {
            title: req.body.title,
            post_content: req.body.post_content
        }
        // updates in db
        const updated = await Post.update(updatedPost, {
            where: {
                id: req.params.id
            }
        })
        // status msg
        res.status(200).json({ msg: updated })
    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;