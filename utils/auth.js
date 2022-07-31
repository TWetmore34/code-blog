// check if loggedin is ture, else redirect to login
function withAuth (req, res, next) {
    if(!req.session.logged_in){
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports = withAuth;