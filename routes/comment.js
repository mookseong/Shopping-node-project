const express = require('express');
const Comment = require('../models/comment');
const authController = require("../controller/auth-controller");



const router = express.Router();

router.route('/')
    .get( authController.isLoggedIn, (req, res) => {
        res.render('comment', {
            title: require('../package.json').name,
            userId: req.user.id
        });
    })
    .post(async (req, res, next) => {
        const { comment } = req.body;
        const userId = req.user.id;

        try {
            await Comment.create({ userId, comment });
            res.redirect('/');
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

router.use((req, res, next) => {
    next('Not found error!');
});

router.use((err, req, res, next) => {
    res.status(500).send(err.toString());
});

module.exports = router;
