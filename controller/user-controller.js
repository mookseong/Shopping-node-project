const userService = require("../service/user-service");
const userRepository = require("../repository/user-repository");
const User = require("../models/user");

exports.getUserKey = async (req, res, next) => {
    console.log(Object.keys(global.users))
    res.render('user', {
        title: require('../package.json').name, port: process.env.PORT, users: Object.keys(global.users)
    })
};

exports.findUser = async (req, res, next) => {
    res.send(userService.getUser(req.params.id));
};

exports.createUser = async (req, res, next) => {
    const {id, password, name, description} = req.body;
    await userService.createUser(id, password, name, description)
        .then(() => res.redirect('/'))
        .catch(err => {
            console.error(`[UserService]유저 추가를 실패. ${err}`);
            next(err);
        })
};
exports.updateUser = async (req, res, next) => {
    userService.updateUser(req.body.id, req.body.description)
        .then(() => res.redirect('/'))
        .catch(err => {
            console.error(`[UserService]유저정보 업데이트 실패. Error : ${err}`);
            next(err);
        });
}
exports.deleteUser = async (req, res, next) => {
    const id = req?.query?.id;
    userService.deleteUser(id)
        .then(() => res.redirect('/'))
        .catch(err => {
            console.error(`[UserService]유저 정보 삭제실패. Error : ${err}`);
            next(err);
        });
}

