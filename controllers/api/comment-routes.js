const router = require('express').Router();
const { Comment } = require('../../models')

// new Comment
router.post('/', (req, res) => {
    const newComment = {
        content: req.body.content,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    };
    Comment.create(newComment);
    res.json({newComment})
});

module.exports = router;