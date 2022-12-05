const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const userController = require("../controller/user-controller")
const User = require("../models/user");
const bcrypt = require("bcrypt");
const {logout} = require("./helpers");

router.use(bodyParser.json());


router.route('/')
    .get(async (req, res, next) => {
        try {
            const users = await User.findAll({
                attributes: ['id']
            });

            res.render('user', {
                title: require('../package.json').name,
                port: process.env.PORT,
                users: users.map(user => user.id)
            });
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        const { id, password, name, description } = req.body;

        const user = await User.findOne({ where: { id } });
        if (user) {
            next('이미 등록된 사용자 아이디입니다.');
            return;
        }

        try {
            const hash = await bcrypt.hash(password, 12);
            await User.create({
                id,
                password: hash,
                name,
                description
            });

            res.redirect('/');
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

router.post('/update', async (req, res, next) => {
    try {
        const result = await User.update({
            description: req.body.description
        }, {
            where: { id: req.body.id }
        });

        if (result) res.redirect('/');
        else next(`There is no user with ${req.params.id}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/delete/:id', async (req, res, next) => {
    try {
        const result = await User.destroy({
            where: { id: req.params.id }
        });

        if (result) next();
        else next(`There is no user with ${req.params.id}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
}, logout);

router.get('/:id/comments', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id }
        });

        const comments = await user.getComments();
        if (user) res.json(comments);
        else next(`There is no user with ${req.params.id}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});


// 사용자 정보 조회 API
router.get('/:id', userController.findUser);
// 사용자 정보 추가 API
router.post('/cid', userController.createUser);
// 사용자 정보 수정 API
router.post('/uid', userController.updateUser);
// 사용자 정보 삭제 API
router.get('/did', userController.deleteUser);

router.use(( req, res, next) => {
    next('Not found error!');
});

router.use((err, req, res, next) => {
    res.status(500).send(err.toString());
});

module.exports = router;
