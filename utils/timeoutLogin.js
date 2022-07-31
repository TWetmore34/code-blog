const moment = require('moment');
// change this to be on true idle instead of on certain page loads
function timeoutCheck (req, res, next) {
        if(req.session.cookie._expires.getMinutes() > parseInt(moment().format('mm'))){
            let userId = req.session.user_id
            let loggedIn = req.session.logged_in
            req.session.regenerate(err => {
                if(err) throw err
            });
            req.session.save(() => {
                req.session.logged_in = loggedIn
                req.session.user_id = userId
            })
            
            next();
        } else {
            res.redirect('/login');
        }
}

module.exports = timeoutCheck;