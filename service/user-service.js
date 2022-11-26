const bcrypt = require('bcrypt')
const userRepository = require('../repository/user-repository')


exports.createUser = async (id, password, name, description) => {
    const user = await userRepository.findUserById(id);
    if (user) {
        throw '이미 등록된 사용자 아이디입니다.';
    }
    try {
        const hash = await bcrypt.hash(password, 12);
        await userRepository.createUser({id, hash, name, description});
    } catch (err) {
        console.log(`Error : ${err}`);
        throw err
    }
};

exports.updateUser = async (id, description) => {
    try {
        const result = await userRepository.updateUser(id, description)
        return !!result;
    } catch (err) {
        console.error(err);
        throw err
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const result = await userRepository.deleteUser(req.params.id);
        return !!result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

exports.getUser = async (id) => {
    try {
        return await userRepository.getUser(id);
    } catch (err) {
        console.error(err);
        throw err;
    }
};