const userService = require("../service/user-service");

exports.findUser = (req, res, next) => {
    res.send(userService.getUser(req.params.id));
};

exports.createUser = (req, res, next) => {
    const {id, password, name, description} = req.body;
    userService.createUser(id, password, name, description)
        .then(res.redirect('/'))
        .catch(
            err => {
                next(err);
                console.log(`Error : ${err}`);
            }
        );
};
exports.updateUser = (req, res, next) => {
    userService.updateUser(req.body.id, req.body.description)
        .then(res.redirect('/'))
        .catch(
            err => {
                next(err);
                console.log(`유저정보를 업데이트 실패 했습니다. Error : ${err}`);
            }
        );
}
exports.deleteUser = (req, res, next) => {
    const id = req?.query?.id;
    userService.deleteUser(id)
        .then(res.redirect('/'))
        .catch(
            err => {
                next(err);
                console.log(`'유저정보를 생성에 실패 했습니다. Error : ${err}`);
            }
        );
}

