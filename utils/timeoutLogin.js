function timeoutCheck (req, res, next) {
    try {
        // so im having an issue where this doesnt actually reset the global var? 
        // conceptually ik im heading in the rihgt direction with this, its just not wokring
        const date = new Date(req.session.cookie._expires.getMinutes()+10)
        req.session.cookie._expires = date
        next()
    }
    catch (err) {
        res.status(500).json(err)
    }
}

module.exports = timeoutCheck