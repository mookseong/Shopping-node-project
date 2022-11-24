const express = require('express');
const session = require("express-session");
const {getUser} = require("../service/user-service");
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    if (req.headers.cookie) {
        const [, privateKey] = req.headers.cookie.split('=');
        res.redirect(302, '/logout.html');
    } else {
        res.redirect(302, '/login.html');
    }
});

//login
router.post('/iid', (req, res, next) => {
    const {id} = req.body;
    if (id in getUser()) {
        const privateKey = Math.floor(Math.random() * 1000000000);
        session[privateKey] = id;
        res.setHeader('Set-Cookie', `connect.id=${privateKey}; path=/`);
        res.redirect(302, '/');
    } else {
        res.redirect(302, '/login');
    }

});
//logout
router.get('/oid', (req, res, next) => {
    const [, privateKey] = req.headers.cookie.split('=');
    delete session[privateKey];
    res.setHeader('Set-Cookie', 'connect.id=delete; Max-age=0; path=/');
    res.redirect(302, '/');
});

router.use((req, res, next) => {
    next('Not found error!');
});


router.use((err, req, res, next) => {
    res.status(500).send(err);
});


module.exports = router;
