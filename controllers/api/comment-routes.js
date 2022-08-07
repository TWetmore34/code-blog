const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// new Comment
router.post('/', withAuth, (req, res) => {
    // create new comment obj with req.body
    const newComment = {
        content: req.body.content,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    };
    // commit to db
    Comment.create(newComment);
    res.json({newComment})
});

// update comment
router.put('/:id', async (req, res) => {
    const updateMe = await {
        content: req.body.content,
    }
    const updated = await Comment.update(updateMe, {
        where: {
            id: req.params.id
        }
    })
    console.log(updated)
    res.status(200).json(updated)
})

router.delete('/:id', withAuth, (req, res) => {
    // destroy selected comment. delete request accesses with e.target.user_id
    Comment.destroy({ where: { id: req.params.id }})
});

module.exports = router;