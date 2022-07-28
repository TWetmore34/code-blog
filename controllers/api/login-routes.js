const router = require('express').Router();
const { User } = require('../../models')

// create new user
router.post('/', async (req, res) => {
    // make sure we add a hash on the password! itll be w a hook on before create
    const newUser = await {
        name: req.body.name,
        password: req.body.password
    }
    User.create(newUser)
    res.status(201).json(newUser)
})

module.exports = router;