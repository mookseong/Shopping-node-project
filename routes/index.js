const express = require('express');
const indexController = require("../controller/index-controller");


const router = express.Router();

router.get('/users', indexController.usersIndex);

router.get('/comments', indexController.usersComments);

router.get('/data', indexController.usersDataComments);

router.get('/products', indexController.productsIndex);

/* 코드 활성화 시 서버 열면 무조건 에러처리로 넘어감
router.use((req, res, next) => {
    next('Not found error!');
});
*/

router.use((err, req, res, next) => {
    res.status(500).send(err.toString());
});

module.exports = router;
