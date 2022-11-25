const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const userController = require("../controller/user-controller")

router.use(bodyParser.json());
router.get('/', (_, res) => res.redirect(301, '/users/index.html'));
router.get('/create', (_, res) => res.redirect(301, '/users/create.html'));
router.get('/read', (_, res) => res.redirect(301, '/users/read.html'));
router.get('/update', (_, res) => res.redirect(301, '/users/update.html'));
router.get('/delete', (_, res) => res.redirect(301, '/users/delete.html'));

// 사용자 정보 조회 API
router.get('/rid', userController.findUser);
// 사용자 정보 추가 API
router.post('/cid', userController.createUser);
// 사용자 정보 수정 API
router.post('/uid', userController.updateUser);
// 사용자 정보 삭제 API
router.get('/did', userController.deleteUser);


router.use((req, res, next) => {
    next('Not found error!');
});


router.use((err, req, res, next) => {
    res.status(500).send(err);
});

module.exports = router;
