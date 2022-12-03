const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const boardController = require("../controller/board-controller")

router.use(bodyParser.json());

router.get('/', (_, res) => res.redirect(301, '/board/index.html'));
router.get('/create', (_, res) => res.redirect(301, '/board/create.html'));
router.get('/read', (_, res) => res.redirect(301, '/board/read.html'));
router.get('/update', (_, res) => res.redirect(301, '/board/update.html'));
router.get('/delete', (_, res) => res.redirect(301, '/board/delete.html'));


// 게시판 정보 추가 API
router.post('/cbd', boardController.createBoard);
// 게시판 정보 조회 API
router.get('/rbd', boardController.findBoard);
// 게시판 정보 조회 API
router.get('/all', boardController.allBoard);
// 게시판 정보 수정 API
router.post('/ubd', boardController.updateBoard);
// 게시판 정보 삭제 API
router.get('/dbd', boardController.deleteBoard);


router.use((req, res, next) => {
    next('Not found error!');
});


router.use((err, req, res) => {
    res.status(500).send(err.toString());
});

module.exports = router;
