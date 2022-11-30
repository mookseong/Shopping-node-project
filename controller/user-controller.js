const userService = require("../service/user-service");

exports.findUser = (req, res, next) => {
    res.send(userService.getUser(req.params.id));
};

exports.createUser = (req, res, next) => {
    const {id, password, name, description} = req.body;
    userService.createUser(id, password, name, description)
        .then(() => res.redirect('/'))
        .catch(
            err => {
                console.error(`[UserService]유저 추가를 실패. ${err}`);
                next(err);
            }
        )
    //res.redirect('/')
};
exports.updateUser = (req, res, next) => {
    userService.updateUser(req.body.id, req.body.description)
        .then(() => res.redirect('/'))
        .catch(
            err => {
                console.error(`[UserService]유저정보 업데이트 실패. Error : ${err}`);
                next(err);
            }
        );
}
exports.deleteUser = (req, res, next) => {
    const id = req?.query?.id;
    userService.deleteUser(id)
        .then(() => res.redirect('/'))
        .catch(
            err => {
                console.error(`'[UserService]유저 정보 삭제실패. Error : ${err}`);
                next(err);
            }
        );
}

