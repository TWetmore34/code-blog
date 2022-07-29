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
    try{
    const newUser = await {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    }
    if(!newUser) {
        res.status(404).json({ msg: 'please give a valid email, password, and name' })
        return
    };
    User.create(newUser)
    req.session.save(() => {
        req.session.id = newUser.id;
        req.session.logged_in = true;
    });
    console.log(req.session)
    res.status(201).json(newUser)
}
    catch (err) {
        res.status(500).json(err)
    }
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
        req.session.save(() => {
            req.session.id = setUser.id;
            req.session.logged_in = true
            res.status(200).json({ user: setUser, msg: 'you are now logged in!' })
        });
        console.log(req.session)
    } else {
        res.status(400).json({ msg: 'incorrect username or password. Try again!' })
    }
}
    catch (err) {
        res.status(500).json({ msg: err })
    }
})

module.exports = router;