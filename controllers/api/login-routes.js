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
        // grab req.body props
    const newUser = await {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    }
    // if missing property, alert the user
    if(!newUser) {
        res.status(404).json({ msg: 'please give a valid email, password, and name' })
        return
    };
    // commit user to db
    User.create(newUser)
    // create logged_in prop and save user_id for conditional rendering
    req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.logged_in = true;
    });
    // status msg
    res.status(201).json(newUser)
}
    catch (err) {
        res.status(500).json(err)
    }
});

// login request
router.post('/login', async (req, res) => {
    try {
        // find requested user email
    const setUser = await User.findOne({
        where: {
            email: req.body.email,
        },
    })
    // if user not found, alert the clientside
    if(!setUser) {
        res.status(400).json({ msg: 'Incorrect email or password. Try again!' })
        return
    }
    // bcrpty method compares stored hash pass against entered pass
    const compare = await bcrypt.compare(req.body.password, setUser.password)

    if (compare) {
        // set loggedin and user id
        req.session.save(() => {
            req.session.user_id = setUser.id;
            req.session.logged_in = true
            // success msg
            res.status(200).json({ user: setUser, msg: 'you are now logged in!' })
        });
    } else {
        // rejection msg
        res.status(400).json({ msg: 'incorrect username or password. Try again!' })
    }
}
    catch (err) {
        res.status(500).json({ msg: err })
    }
});

// logout request
router.post('/logout', (req, res) => {
    try {
    if(req.session.logged_in) {
        // destroy props in session obj if exists
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        // status failed
        res.status(404).end();
    }
}
    catch (err) {
        res.status(500).json(err)
    }
});

// update email
router.put('/email', async (req, res) => {
    try{
        // new email from req.body updates user where req.session.user_id
    const currentUser = await User.update({
        email: req.body.email
    }, {
        where: {
            id: req.session.user_id
        }
    });
    res.status(200).json(currentUser.email)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;