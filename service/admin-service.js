const bcrypt = require("bcrypt");
const userRepository = require("../repository/user-repository");
const productRepository = require("../repository/product-repository");

exports.addUser = async (id, password, name, description) => {
    const user = await userRepository.findUserById(id);
    if (user) {
        console.error(`[AdminService]유저 추가를 실패.`);
        throw '이미 등록된 사용자 아이디입니다.';
    }
    const hash = await bcrypt.hash(password, 12);
    await userRepository.createUser(id, hash, name, description);
};

exports.searchUser = async (id) => {
    const user = await userRepository.getUser(id);
    if (!user) throw `[AdminService] ${id} 유저 정보 없음`;
    return user
};

exports.gettingAllUser = async () => {
    console.log(`[AdminService] 유저정보 요청`)
    const user = await userRepository.findAllUser()
    if (!user) {
        console.error("[AdminService] 유저 정보 없음");
        throw `유저 정보 없음`;
    }
    return user
};

exports.changeUserInfo = async (id, description) => {
    const result = await userRepository.updateUser(id, description);
    if (!result) {
        console.error(`[AdminService]유저정보 업데이트 실패. `);
        throw ('Not updated!');
    }
    console.log(`${id} 유저 정보 업데이트 완료`)
};

exports.removeUser = async (id) => {
    const result = await userRepository.deleteUser(id);
    if (!result) {
        console.error(`[AdminService]유저 정보 삭제실패.`);
        throw ('Not delete!');
    }
    console.log(`${id} 유저 삭제 완료`)
};

exports.addProduct = async (name, price, description) => {
    const product = await productRepository.getProduct(name);
    if (product) {
        console.error(`[AdminService] 상품 추가 실패.`)
        throw `상품 (${name})가 이미 존재합니다.`;
    }
    await productRepository.createProduct(name, price, description);
};

exports.searchProduct = async (id) => {
    const product = await productRepository.getProduct(id);
    if (!product) throw `[AdminService] ${id} 상품 없음`;
    return product;
};

exports.gettingAllProduct = async () => {
    console.log(`[AdminService] 상품 정보 요청`);
    const product = await productRepository.allProduct()
    if (!product) {
        console.error(`[AdminService] 상품 정보 없음`);
        throw `상품 정보 없음`;
    }
    return product;
}

exports.changeProductInfo = async (id, name, price, description) => {
    const product = await productRepository.updateProduct(id, name, price, description);
    if (!product) {
        console.error(`[AdminService] 상품 정보 업데이트 실패`)
        throw '업데이트 실패!';
    }
    console.log(`${id}번 상품 정보 업데이트 완료`);
};

exports.removeProduct = async (id) => {
    const product = await productRepository.deleteProduct(id);
    if (!product) {
        console.error(`[AdminService] 상품 정보 삭제 실패`)
        throw '삭제 실패!';
    }
    console.log(`상품: ${id} 삭제 완료`);
};

