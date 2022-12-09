const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const userController = require("../controller/user-controller")
const authController = require("../controller/auth-controller")
const authService = require("../service/auth-service");
const response = require("../data/responseFrom");
const resTEXT = require("../data/responseString");

router.use(bodyParser.json());


router.get('/', authService.isLoggedIn, authService.isPermissionIn, userController.getUser);
router.get('/:id', authService.isLoggedIn, authService.isPermissionIn, userController.findUser);
router.post('/cid', userController.createUser);
router.post('/uid', authService.isLoggedIn, authService.isPermissionIn, userController.updateUser);
router.get('/did/:id', authService.isLoggedIn, authService.isPermissionIn, userController.deleteUser, authController.logout);

router.use((req, res, next) => {
    next('Not found error!');
});

router.use((err, req, res, next) => {
    res.status(500).json(response.responseFromData(resTEXT.RESPONSE_TEXT.FAIL, resTEXT.USER_MESSAGE.ERROR, err));
});

module.exports = router;
