const express = require('express')
const cartController = require("../controller/cart-controller");
const authService = require("../service/auth-service");
const router = express.Router();


router.get('/cid/:id', authService.isLoggedIn, cartController.addShoppingCart);

router.get('/did/:id', authService.isLoggedIn, cartController.deleteCartList);

router.get('/', authService.isLoggedIn, cartController.allCartList);


router.use((req, res, next) => {
    next('Not found error!');
});

router.use((err, req, res, next) => {
    res.status(500).send(err.toString());
});

module.exports = router;