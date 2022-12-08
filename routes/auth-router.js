const express = require('express')
const router = express.Router();
const authController = require("../controller/auth-controller");
const authService = require("../service/auth-service");
const response = require("../data/ResponseFrom");

router.post('/login', authController.login);

router.get('/logout', authService.isLoggedIn, authController.logout);
router.get('/kakao', authController.kakao);
router.get('/kakao/callback', authController.kakaoCall, (req, res) => res.redirect('/'));

router.use((req, res, next) => {
    next('Not found error!');
});

router.use((err, req, res, next) => {
    res.status(500).json(response.responseFromData("[auth]에러 발생", err));
});

module.exports = router;
