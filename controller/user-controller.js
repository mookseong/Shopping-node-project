const userService = require("../service/user-service");
const response = require("../data/ResponseFrom");


exports.findUser = async (req, res, next) => {
    await userService.getUser(req.params.id)
        .then((user) => res.json(response.responseFromData("success","[user]유저 정보 요청 완료", user)))
        .catch(err => next(err));
};

exports.getUser = async (req, res, next) => {
    await userService.findAllUser()
        .then((user) =>
            res.status(200).json(response.responseFromData("success","[user]모든 유저 정보 요청 완료", user)))
        .catch(err => next(err));
};

exports.createUser = async (req, res, next) => {
    const {id, password, name, description} = req.body;
    await userService.createUser(id, password, name, description)
        .then(() =>
            res.status(200).json(response.responseFromMessage("success","[User]유저정보 추가 완료")))
        .catch(err => next(err));
};

exports.updateUser = async (req, res, next) => {
    const {id, description} = req.body;
    await userService.updateUser(id, description)
        .then(() =>
            res.status(200).json(response.responseFromMessage("success","[User]유저정보 업데이트 완료")))
        .catch(err => next(err));
};

exports.deleteUser = async (req, res, next) => {
    const id = req.params.id;
    await userService.deleteUser(id)
        .then(() =>
            res.status(200).json(response.responseFromMessage("success","[User]유저정보 삭제 완료")))
        .catch(err => next(err));
};

