const express = require('express');
const indexController = require("../controller/index-controller");


const router = express.Router();

router.get('/users', indexController.usersIndex);

router.get('/comments', indexController.usersComments);

router.get('/data', indexController.usersDataComments);

module.exports = router;
