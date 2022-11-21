const bcrypt = require('bcrypt')
const userRepository = require('../repository/user-repository')
const User = require('../models/user');

exports.createUser = async (req, res, next) => {
    const {id, password, name, description} = req.body;

    const user = await userRepository.findUserById(id);
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

exports.updateUser = async (req, res, next) => {
    try {
        const result = await User.update({
            description: req.body.description
        }, {
            where: {id: req.body.id}
        });
        if (result) res.redirect('/'); else next('Not updated!')
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const result = await userRepository.deleteUser(req.params.id);
        if (result) res.redirect('/'); else next('Not deleted!')
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const user = await userRepository.getUser(req.params.id);
        res.json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
};