const express = require('express');
const bodyParser = require("body-parser");
const imgRepository = require("../service/img-service");
const bordController = require("../controller/bord-controller")
const router = express.Router();

router.use(bodyParser.json());

router.get('/', (_, res) => res.redirect(301, '/bord/index.html'));
router.get('/create', (_, res) => res.redirect(301, '/bord/create.html'));
router.get('/read', (_, res) => res.redirect(301, '/bord/read.html'));
router.get('/update', (_, res) => res.redirect(301, '/bord/update.html'));
router.get('/delete', (_, res) => res.redirect(301, '/bord/delete.html'));
router.get('/uploads', (_, res) => res.redirect(301, '/bord/uploads.html'));


// 앨범 사진 등록
router.post('/uploads', imgRepository.multiUpload, (req, res, next) => res.redirect(302, '/bord/index.html'));

// 공지 사진 삭제
router.get('/did', bordController.deleteNotice);

// 공지 사항 등록
router.post('/cid', bordController.addNotice);

// 공지 사항 수정
router.post('/uid', bordController.updateNotice);

// 공지 사항 조회
router.get('/rid', bordController.readNotice);

// 공지 사항 조회
router.get('/all', bordController.allNotice);

module.exports = router;
