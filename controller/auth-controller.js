const passport = require('passport');

exports.isLoggedIn = async (req, res, next) => {
    if (req.isAuthenticated()) next(); else res.status(403).send('로그인 필요');
};

exports.isNotLoggedIn = async (req, res, next) => {
    if (!req.isAuthenticated()) next(); else res.redirect(`/`);
};

exports.login = async (req, res, next) => {
    await passport.authenticate('local', (authError, user, info) => {
        if (user) req.login(user, loginError => res.redirect('/')); else next(info);
    })(req, res, next);
};

exports.logout = async (req, res, next) => {
    req.logout((err) => {
        req.session.destroy();
        if (err) {
            next(err);
        } else res.redirect(`/`);
    });
}

exports.kakao = passport.authenticate('kakao')


exports.kakaoCall = passport.authenticate('kakao', {failureRedirect: '/'})
