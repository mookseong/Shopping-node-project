const express = require('express');
const passport = require('passport');

const loginService = require("../controller/login-controller");

const router = express.Router();


router.post('/login',  loginService.login);

router.get('/logout', loginService.logout);

module.exports = router;
