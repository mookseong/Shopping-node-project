const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const adminController = require('../controller/admin-controller');

router.use(bodyParser.json());

router.get('/users', adminController.usersIndex);
router.get('/user', adminController.gettingAllUser);
router.get('/:id', adminController.searchUser);
router.post('/cid',adminController.addUser);
router.post('/uid', adminController.changeUserInfo);
router.get('/did/:id', adminController.removeUser);


router.get('/products', adminController.productsIndex);
router.get('/product', adminController.searchProduct);
router.get('/:id', adminController.searchProduct);
router.post('/cit', adminController.addProduct);
router.post('/uit', adminController.changeProductInfo);
router.get('/dit/:id', adminController.removeProduct)

router.use((req, res, next) => {
    next('Not found error!');
});

router.use((err, req, res, next) => {
    res.status(500).send(err.toString());
});


module.exports = router;