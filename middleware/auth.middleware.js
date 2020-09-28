module.exports.requireAuth = function(req, res, next) {
    if (!req.cookies.fakeCookie) {
        res.redirect('/');
        return;
    }
    next();
}