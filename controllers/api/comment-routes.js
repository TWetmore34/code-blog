const router = require('express').Router();
const { Comment } = require('../../models');
const timeoutCheck = require('../../utils/timeoutLogin');
const withAuth = require('../../utils/auth');


// new Comment
router.post('/', timeoutCheck, withAuth, (req, res) => {
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

router.delete('/:id', timeoutCheck, withAuth, (req, res) => {
    // destroy selected comment. delete request accesses with e.target.user_id
    Comment.destroy({ where: { id: req.params.id }})
});

module.exports = router;