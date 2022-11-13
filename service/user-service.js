const userRepository = require("../repository/user-repository");
const fs = require("fs");
const imgRepository = require("./img-service");

exports.getAllUser = () => {
    return userRepository.getUser()
}

exports.getUser = (id) => {
    const user = userRepository.getUser();
    if (id in user) {
        return JSON.stringify(user[id]);
    }
    return `존재하지 않은 ID: ${id}`;
};
exports.setUser = (id, name, birth, gender, img) => {
    const users = userRepository.getUser()
    if (!(id in users)) {
        userRepository.setUser(id, name, birth, gender, img);
        return `등록 성공 ID: ${id}`
    }
    return `이미 존재하는 ID: ${id}`
};

exports.putUser = (id, name, birth, gender, req) => {
    const user = userRepository.getUser()
    if (id in user) {
        userRepository.setUser(id, name ? name : user[id].name, birth ? birth : user[id].birth, gender ? gender : user[id].gender, imgRepository.isImgFile(id, req))
        return `변경 성공 ID: ${id}`
    }
    return `변경 실패 존재하지 않음 ID: ${id}`
};
exports.removeUser = (id) => {
    const users = userRepository.getUser()
    if (id in users) {
        fs.unlink(`${users[id].img}`, err => {
            if (err) {
                console.log(`파일 삭제 Error 발생 : ${err}`);
            }
        });
        userRepository.deleteUser(id)
        return `삭제완료 ID: ${id}`;
    } else {
        return `존재하지 않은 ID: ${id}`;
    }
};