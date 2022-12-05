const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
  passport.use(new Strategy({
    usernameField: 'id',
    passwordField: 'password'
  }, async (id, password, done) => {

    try {

      const user = await User.findOne({ where: { id } });

      if (user && await bcrypt.compare(password, user.password))
        done(null, user);
      else
        done(null, false, user ? '비밀번호가 일치하지 않습니다.' : '가입되지 않은 회원입니다.');

    } catch (error) {
      done(error);
    }
  }));
};
