const express = require('express');
const userRepository = require('../repository/user-repository')

const router = express.Router();

router.get('/', (req, res,next) => {
    try {
        const users = userRepository.findAllUser();
        res.json(users);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
