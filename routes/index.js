const express = require('express');
const indexController = require("../controller/index-controller");


const router = express.Router();

router.get('/users', indexController.usersIndex);

router.get('/comments', indexController.usersComments);

router.get('/data', indexController.usersDataComments);

router.get('/products', async (req, res, next) => {
    try {
        const products = await Product.findAll({})
        res.json(products);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
