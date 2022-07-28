// consolidates backend api requests
const router = require('express').Router();
const usersApi = require('./login-routes')
const postApi = require('./post-routes')

router.use('/users', usersApi)
router.use('/posts', postApi)

module.exports = router;