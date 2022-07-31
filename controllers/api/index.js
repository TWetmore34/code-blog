// consolidates backend api requests
const router = require('express').Router();
const usersApi = require('./login-routes');
const postApi = require('./post-routes');
const commentApi = require('./comment-routes');

// different api routes
router.use('/users', usersApi);
router.use('/posts', postApi);
router.use('/comments', commentApi);

module.exports = router;