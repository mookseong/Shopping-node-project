const express = require('express');
const passport = require('passport');

const { logout } = require('../controller/helpers');

const router = express.Router();


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (user) req.login(user, loginError => res.redirect('/'));
        else next(info);
    })(req, res, next);
});

router.get('/logout', logout);



module.exports = router;
