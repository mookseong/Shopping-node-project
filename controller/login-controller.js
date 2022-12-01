const passport = require("passport");



exports.logout = (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
};

exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (user) req.login(user, loginError => res.redirect('/'));
        else next(info);
    });
};