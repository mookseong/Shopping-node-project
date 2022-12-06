const productRepository = require("../repository/product-repository");

exports.createProduct = async (num, name, price, description) => {
    const product = await productRepository.getProduct(num);
    if (product) throw `상품 번호 (${num})가 이미 존재합니다.`;
    await productRepository.createProduct(num, name, price, description);
};

exports.getProduct = async (num) => {
    const product = await productRepository.getProduct(num);
    if (!product) throw `상품이 존재하지 않습니다.`;
    return product;
};

exports.allProduct = async () => {
    return await productRepository.allProduct();
}

exports.updateProduct = async (num, name, price, description) => {
    const product = await productRepository.updateProduct(num, name, price, description);
    if (!product) throw '업데이트 실패!';
    console.log(`${num}번 상품 정보 업데이트 완료`);
};

exports.deleteProduct = async (num) => {
    const product = await productRepository.deleteProduct(num);
    if (!product) throw '삭제 실패!';
    console.log(`${num}번 상품 삭제 완료`);
};