module.exports = function isAuth(req, res, next) {
    if(req.session.isAuth) {
        next()
    }
    else {
        res.redirect('/auth/login')
    }
}
