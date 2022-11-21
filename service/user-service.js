const userRepository = require("../repository/user-repository");
const imgRepository = require("./img-service");
const bcrypt = require('bcrypt')
const User = require('../models/user');
const Info = require('../models/info');

exports.createUser = async (req, res, next) => {
    const {id, password, name, description} = req.body;

    const user = await User.findOne({where: {id}});
    if (user) {
        next('이미 등록된 사용자 아이디입니다.');
        return;
    }
    try {
        const hash = await bcrypt.hash(password, 12);
        await User.create({id, password: hash, name, description});
        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.putUser = async (req, res, next) => {
    try {
        const result = await User.update({
            description: req.body.description
        }, {
            where: {id: req.body.id}
        });
        if (result) res.redirect('/'); else next('Not info!')
    } catch (err) {
        console.error(err);
        next(err);
    }
};
exports.deleteUser = async (req, res, next) => {
    try {
        const result = await User.destroy({
            where: {id: req.params.id}
        });

        if (result) res.redirect('/'); else next('Not deleted!')
    } catch (err) {
        console.error(err);
        next(err);
    }
};