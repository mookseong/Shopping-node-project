const cartRepository = require("../repository/cart-repository");
const productRepository = require("../repository/product-repository");

exports.getCart = async (userID) => {
    const carts = await cartRepository.getCart(userID);
    if (!carts) throw `[CartService] ${id} 정보 없음`;
    return carts;
};

exports.createCart = async (id, userID) => {
    const product = await productRepository.getProduct(id, userID);
    if (!product) {
        console.error(`[CartService] 상품 추가 실패.`)
        throw `상품 (${id})가 존재하지 않습니다.`;
    }
    await cartRepository.createCart(id, userID);
};
exports.deleteCart = async (id) => {
    await cartRepository.deleteCart(id)
        .catch(err => {
            console.error(`[CartService] 장바구니에서 에러가 발생했습니다. ${err}`)
            throw `장바구니에 (${id})가 존재하지 않습니다.`;
        });
};

