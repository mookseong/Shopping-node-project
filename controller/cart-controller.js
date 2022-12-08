const cartService = require("../service/cart-service")
const response = require("../data/ResponseFrom");

exports.addShoppingCart = async (req, res, next) => {
    await cartService.createCart(req.params.id, req.user.id)
        .then(() => res.json((response.responseFromMessage("[cart]카트 추가 완료"))))
        .catch(err => next(err));
};

exports.allCartList = async (req, res, next) => {
    await cartService.getCart(req.user.id)
        .then((cart) => res.json(response.responseFromData("[cart]카트 정보 요청 완료", cart)))
        .catch(err => next(err));
};

exports.deleteCartList = async (req, res, next) => {
    await cartService.deleteCart(req.params.id)
        .then((cart) => res.json(response.responseFromData("[cart]카트 정보 삭제 완료", cart)))
        .catch(err => next(err));
};