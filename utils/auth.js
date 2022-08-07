// check if loggedin is true, else redirect to login
function withAuth (req, res, next) {
    if(!req.session.user_id){
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;