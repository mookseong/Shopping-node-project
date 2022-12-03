const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();

//upload

//list


//donwload



router.use((req, res, next) => {
    next('Not found error!');
});


router.use((err, req, res, next) => {
    res.status(500).send(err);
});

module.exports = router;
