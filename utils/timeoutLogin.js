const moment = require('moment');
// change this to be on true idle instead of on certain page loads
function timeoutCheck (req, res, next) {
        // if cookie isnt expired, refresh cookie data, else send to login
        if(req.session.cookie._expires.getMinutes() > parseInt(moment().format('mm'))){
            // grab user data from previous cookie
            let userId = req.session.user_id
            let loggedIn = req.session.logged_in
            req.session.regenerate(err => {
                if(err) throw err
            });
            // reset user data from previous cookie
            req.session.save(() => {
                req.session.logged_in = loggedIn
                req.session.user_id = userId
            })
            next();
        } else {
            req.session.regenerate(err => {
                if(err) throw err
            });
            req.session.save(() => {
                req.session.user_id = req.session.user_id
                req.session.logged_in = false
            })
            res.redirect('/login');
        }
}

module.exports = timeoutCheck;