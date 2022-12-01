const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const bordController = require("../controller/bord-controller")

router.use(bodyParser.json());

// 게시판 정보 추가 API
router.post('/cbd', bordController.createBord);
// 게시판 정보 조회 API
router.get('/rbd', bordController.findBord);
// 게시판 정보 조회 API
router.get('/all', bordController.allBord);
// 게시판 정보 수정 API
router.post('/ubd', bordController.updateBord);
// 게시판 정보 삭제 API
router.get('/dbd', bordController.deleteBord);


router.use((req, res, next) => {
    next('Not found error!');
});


router.use((err, req, res, next) => {
    res.status(500).send(err.toString());
});

module.exports = router;
