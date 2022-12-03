const express = require('express');
const { User, Comment } = require('../models');


const router = express.Router();

router.get('/users', async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'description']
        });
        res.json(users);
    } catch (err) {
        console.error(err);
        next(err);
    }
});


module.exports = router;
