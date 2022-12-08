const express = require('express')
const basketController = require("../controller/shopping-card-controller");
const authService = require("../service/auth-service");
const router = express.Router();

router.get('/:id', authService.isLoggedIn,);


router.use((req, res, next) => {
    next('Not found error!');
});

router.use((err, req, res, next) => {
    res.status(500).send(err.toString());
});

module.exports = router;