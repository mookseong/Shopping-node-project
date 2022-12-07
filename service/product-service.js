const productRepository = require("../repository/product-repository");

exports.createProduct = async (name, price, description) => {
    const product = await productRepository.getProduct(name);
    if (product) {
        console.error(`[ProductService] 상품 추가 실패.`)
        throw `상품 (${name})가 이미 존재합니다.`;
    }
    await productRepository.createProduct(name, price, description);
};

exports.getProduct = async (id) => {
    const product = await productRepository.getProduct(id);
    if (!product) throw `[ProductService] ${id} 상품 없음`;
    return product;
};

exports.allProduct = async () => {
    console.log(`[ProductService] 상품 정보 요청`);
    const product = await productRepository.allProduct()
    if (!product) {
        console.error(`[productService] 상품 정보 없음`);
        throw `상품 정보 없음`;
    }
    return product;
}
exports.allProductList = async () => {
    console.log(`[ProductService] 상품 정보 요청`);
    const product = await productRepository.allProductList()
    if (!product) {
        console.error(`[productService] 상품 정보 없음`);
        throw `상품 정보 없음`;
    }
    return product;
}



exports.updateProduct = async (id, name, price, description) => {
    const product = await productRepository.updateProduct(id, name, price, description);
    if (!product) {
        console.error(`[productService] 상품 정보 업데이트 실패`)
        throw '업데이트 실패!';
    }
    console.log(`${id}번 상품 정보 업데이트 완료`);
};

exports.deleteProduct = async (id) => {
    const product = await productRepository.deleteProduct(id);
    if (!product) {
        console.error(`[productService] 상품 정보 삭제 실패`)
        throw '삭제 실패!';
    }
    console.log(`상품: ${id} 삭제 완료`);
};