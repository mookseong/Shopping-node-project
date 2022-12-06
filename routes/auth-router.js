const express = require('express')
const router = express.Router();
const authController = require("../controller/auth-controller");
const passport = require("passport");

router.post('/login', authController.login);

router.get('/logout', authController.isLoggedIn, authController.logout);

router.get('/kakao', authController.kakao);
router.get('/kakao/callback', authController.kakaoCall, (req, res) => res.redirect('/'));

module.exports = router;
