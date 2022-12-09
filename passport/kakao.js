const passport = require('passport');
const Strategy = require('passport-kakao').Strategy;
const userRepository = require('../repository/user-repository')

module.exports = () => {
    passport.use(new Strategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userRepository.findUserById(profile.id);
            if (!user)
                user = await userRepository.createUser(profile.id, '', profile.username, profile._json.properties.profile_image)

            done(null, user);
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};
