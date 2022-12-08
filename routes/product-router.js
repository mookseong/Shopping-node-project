const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const productController = require("../controller/product-controller");
const authService = require("../service/auth-service");
const response = require("../data/ResponseFrom");

router.use(bodyParser.json());


router.get('/', authService.isLoggedIn, productController.allProduct);
router.get('/:id', authService.isLoggedIn, productController.findProduct);
router.post('/cid', authService.isLoggedIn, productController.createProduct);
router.post('/uid', authService.isLoggedIn, productController.updateProduct);
router.get('/did/:id', authService.isLoggedIn, productController.deleteProduct);

router.use((req, res, next) => {
    next('Not found error!');
});

router.use((err, req, res, next) => {
    res.status(500).json(response.responseFromData("[product]에러 발생", err));
});


module.exports = router;
