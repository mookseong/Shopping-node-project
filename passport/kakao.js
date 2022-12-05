const passport = require('passport');
const Strategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
    passport.use(new Strategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({
                where: { id: profile.id }
            });

            if (!user)
                user = await User.create({
                    id: profile.id,
                    password: '',
                    name: profile.username,
                    description: profile._json.properties.profile_image
                });

            done(null, user);
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};
