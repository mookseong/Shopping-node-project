const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const productController = require("../controller/product-controller");
const authService = require("../service/auth-service");

router.use(bodyParser.json());

router.get('/', productController.allProduct)
router.post('/', authService.isLoggedIn, productController.createProduct);
router.get('/:id', productController.findProduct);
router.post('/update', authService.isLoggedIn, productController.updateProduct);
router.get('/delete/:id', authService.isLoggedIn, productController.deleteProduct);

router.use((req, res, next) => {
    next('Not found error!');
});

router.use((err, req, res, next) => {
    res.status(500).send(err.toString());
});


module.exports = router;
