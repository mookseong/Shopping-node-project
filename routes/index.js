const express = require('express');
const indexController = require("../controller/index-controller");


const router = express.Router();

router.get('/users', indexController.usersIndex);

router.get('/comments', indexController.usersComments);

router.get('/data', indexController.usersDataComments);

router.get('/products', indexController.productsIndex);


router.use((err, req, res, next) => {
    res.status(500).send(err.toString());
});

module.exports = router;
