const userService = require("../service/user-service");

exports.findUser = (req, res, next) => {
    res.send(userService.getUser(req.params.id));
};

exports.findAllUser = (req, res, next) => {

};

exports.createUser = (req, res, next) => {
    const {id, name, birth, description} = req.body;
    try {
        userService.createUser(id, name, birth, description).then(r => {
            if (r) res.redirect('/'); else next('유저정보를 생성에 실패 했습니다.')
        });
    } catch (e) {
        res.send("오류가 발생했습니다.");
        console.log(`Error : ${e}`);
    }
};
exports.updateUser = (req, res, next) => {
    const {id, name, birth, gender} = req.body;
    userService.updateUser(id, name, birth, gender, req).then(r => {
        if (r) res.redirect('/'); else next('유저정보를 업데이트 실패 했습니다.')
    });
    res.send();

}
exports.deleteUser = (req, res, next) => {
    const id = req?.query?.id;
    userService.deleteUser(id).then(r => {
        if (r) res.redirect('/'); else next('유저정보를 생성에 실패 했습니다.')
    });
}

