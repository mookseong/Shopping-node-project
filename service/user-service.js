const bcrypt = require('bcrypt')
const userRepository = require('../repository/user-repository')


exports.createUser = async (id, password, name, description) => {
    const user = await userRepository.findUserById(id);
    if (user) {
        console.error(`[UserService]유저 추가를 실패.`);
        throw '이미 등록된 사용자 아이디입니다.';
    }
    const hash = await bcrypt.hash(password, 12);
    await userRepository.createUser(id, hash, name, description);
};

exports.updateUser = async (id, description) => {
    const result = await userRepository.updateUser(id, description);
    if (!result) {
        console.error(`[UserService]유저정보 업데이트 실패. `);
        throw ('Not updated!');
    }
    console.log(`${id} 유저 정보 업데이트 완료`)
};

exports.deleteUser = async (id) => {
    const result = await userRepository.deleteUser(id);
    if (!result) {
        console.error(`[UserService]유저 정보 삭제실패.`);
        throw ('Not delete!');
    }
    console.log(`${id} 유저 삭제 완료`)
};


exports.findAllUser = async () => {
    console.log(`[UserService] 유저정보 요청`)
    const user = await userRepository.findAllUser()
    if (!user) {
        console.error("[UserService] 유저 정보 없음");
        throw `유저 정보 없음`;
    }
    return user
};

exports.getUser = async (id) => {
    const user = await userRepository.getUser(id);
    if (!user) throw `[UserService] ${id} 유저 정보 없음`;
    return user
};