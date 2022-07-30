function timeoutCheck (req, res, next) {
    try {
        if(!req.Session.cookie._expires){
            res.redirect('/login');
        } else {
            next()
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
}

module.exports = timeoutCheck