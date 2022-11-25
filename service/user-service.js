const bcrypt = require('bcrypt')
const userRepository = require('../repository/user-repository')


exports.createUser = async (id, password, name, description, next) => {
    const user = await userRepository.findUserById(id);
    if (user) {
        next('이미 등록된 사용자 아이디입니다.');
        return;
    }
    try {
        const hash = await bcrypt.hash(password, 12);
        await userRepository.createUser({id, hash, name, description});
    } catch (err) {
        console.log(`Error : ${err}`);
        throw `Error 발생 : ${err}`
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const result = await userRepository.updateUser(req.body.id, req.body.description)
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