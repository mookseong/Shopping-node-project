const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const productController = require("../controller/product-controller");
const authService = require("../service/auth-service");
const response = require("../data/responseFrom");
const resTEXT = require("../data/responseString");

router.use(bodyParser.json());


router.get('/', productController.allProduct);
router.get('/:id', productController.findProduct);
router.post('/cid', authService.isLoggedIn, productController.createProduct);
router.post('/uid', authService.isLoggedIn, productController.updateProduct);
router.get('/did/:id', authService.isLoggedIn, productController.deleteProduct);

router.use((req, res, next) => {
    next('Not found error!');
});

router.use((err, req, res, next) => {
    res.status(500).json(response.responseFromData(resTEXT.RESPONSE_TEXT.FAIL, resTEXT.PRODUCT_MESSAGE.ERROR, err));
});


module.exports = router;
