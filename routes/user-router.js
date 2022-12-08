const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const userController = require("../controller/user-controller")
const authController = require("../controller/auth-controller")
const authService = require("../service/auth-service");

router.use(bodyParser.json());


router.get('/', userController.getUser)
router.get('/:id', userController.findUser);
router.post('/cid', userController.createUser);
router.post('/uid', authService.isLoggedIn, userController.updateUser);
router.get('/did/:id', authService.isLoggedIn, userController.deleteUser, authController.logout);

router.use((req, res, next) => {
    next('Not found error!');
});

router.use((err, req, res, next) => {
    res.status(500).send(err.toString());
});

module.exports = router;
