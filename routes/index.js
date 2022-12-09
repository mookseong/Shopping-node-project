const express = require('express');
const indexController = require("../controller/index-controller");
const authService = require("../service/auth-service");
const response = require("../data/ResponseFrom");


const router = express.Router();

router.get('/users',  authService.isLoggedIn, authService.isAdminIn, indexController.usersIndex);
router.get('/products',  authService.isLoggedIn, indexController.productsIndex);


router.use((err, req, res, next) => {
    res.status(500).json(response.responseFromData("fail","[index]에러 발생", err));
});

module.exports = router;
