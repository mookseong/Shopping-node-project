const passport = require('passport');
const local = require('./local');
const kakao = require('./kakao');
const userRepository = require('../repository/user-repository')

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        userRepository.findUserById(id)
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local();
    kakao();
};
