const userService = require("../service/user-service");

exports.findUser = (req, res, next) => {
    res.send(userService.getUser(req?.query?.id));
};

exports.findAllUser = (req, res, next) => {
    res.send(JSON.stringify(userService.getAllUser()));
};

exports.createUser = (req, res, next) => {
    const {id, name, birth, gender} = req.body;
    try {
        res.send(userService.setUser(id, name, birth, gender, req?.file?.path));
    } catch (e) {
        console.log(`Error : ${e}`);
        res.send("입력되지 않은 값이 존재합니다.");
    }
};
exports.updateUser = (req, res, next) => {
    const {id, name, birth, gender} = req.body;
    res.send(userService.putUser(id, name, birth, gender, req));

}
exports.deleteUser = (req, res) => {
    const id = req?.query?.id;
    res.send(userService.removeUser(id));
}

