const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const userController = require("../controller/user-controller")
const authController = require("../controller/auth-controller")
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.use(bodyParser.json());


router.get('/', userController.getUser)

router.post('/', userController.createUser);
// 사용자 정보 조회 API
router.get('/:id', userController.findUser);
// 사용자 정보 추가 API
router.post('/cid', userController.createUser);
// 사용자 정보 수정 API
router.post('/update', userController.updateUser);
// 사용자 정보 삭제 API
router.get('/delete/:id', userController.deleteUser, authController.logout);

router.use((req, res, next) => {
    next('Not found error!');
});

router.use((err, req, res, next) => {
    res.status(500).send(err.toString());
});

module.exports = router;
