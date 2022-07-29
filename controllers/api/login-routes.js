const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcryptjs');

// get all users (For testing only)
router.get('/', async (req, res) => {
    const userData = await User.findAll()
    res.json(userData)
})

// create new user
router.post('/', async (req, res) => {
    // make sure we add a hash on the password! itll be w a hook on before create
    const newUser = await {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    }
    console.log(newUser)
    User.create(newUser)
    res.status(201).json(newUser)
});

// login request
router.post('/login', async (req, res) => {
    try {
    const setUser = await User.findOne({
        where: {
            email: req.body.email,
        },
    })
    if(!setUser) {
        res.status(400).json({ msg: 'Incorrect email or password. Try again!' })
        return
    }
    const compare = await bcrypt.compare(req.body.password, setUser.password)

    if (compare === true){
        // just change this to set the session logged in to true once we have sessions
        res.status(200).json({ msg: "logged In" })
    } else {
        res.status(400).json({ msg: 'incorrect username or password. Try again!' })
    }
}
    catch (err) {
        res.status(500).json({ msg: err })
    }
})

module.exports = router;