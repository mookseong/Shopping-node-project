const passport = require('passport');
const response = require("../data/ResponseFrom");

exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (user) req.login(user, loginError =>
            res.status(200).json(response.responseFromData("success","[auth]유저 로그인 완료", { userid : user.id, userName :user.name, userDescription : user.description}))); else next(info);
    })(req, res, next);

};

exports.logout = async (req, res, next) => {
    req.logout((err) => {
        req.session.destroy();
        if (err) {
            next(err);
        } else res.json(response.responseFromMessage("success","[auth]유저 로그아웃 완료"));
    });
}

exports.kakao = passport.authenticate('kakao')


exports.kakaoCall = passport.authenticate('kakao', {failureRedirect: '/'})
