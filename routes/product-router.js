const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const productController = require("../controller/product-controller");

router.use(bodyParser.json());


router.get('/', productController.allProduct)

router.post('/', productController.createProduct);
// 상품 정보 조회 API
router.get('/:id', productController.findProduct);
// 상품 정보 추가 API
router.post('/cit', productController.createProduct);
// 상품 정보 수정 API
router.post('/update', productController.updateProduct);
// 상품 정보 삭제 API
router.get('/delete/:id', productController.deleteProduct);

router.use((req, res, next) => {
    next('Not found error!');
});

router.use((err, req, res, next) => {
    res.status(500).send(err.toString());
});


module.exports = router;
