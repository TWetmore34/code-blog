const router = require('express').Router();
const { Comment } = require('../../models');
const timeoutCheck = require('../../utils/timeoutLogin');

// new Comment
router.post('/', timeoutCheck, (req, res) => {
    const newComment = {
        content: req.body.content,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    };
    Comment.create(newComment);
    res.json({newComment})
});

router.delete('/:id', timeoutCheck, (req, res) => {
    Comment.destroy({ where: { id: req.params.id }})
});

module.exports = router;