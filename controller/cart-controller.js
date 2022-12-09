const cartService = require("../service/cart-service")
const response = require("../data/responseFrom");
const resTEXT = require("../data/responseString");

exports.addShoppingCart = async (req, res, next) => {
    await cartService.createCart(req.params.id, req.user.id)
        .then(() => res.status(200).json((response.responseFromMessage(resTEXT.RESPONSE_TEXT.SUCCESS, resTEXT.CART_MESSAGE.CREATE))))
        .catch(err => next(err));
};

exports.allCartList = async (req, res, next) => {
    await cartService.getCart(req.user.id)
        .then((cart) => res.status(200).json(response.responseFromData(resTEXT.RESPONSE_TEXT.SUCCESS, resTEXT.CART_MESSAGE.GET, cart)))
        .catch(err => next(err));
};

exports.deleteCartList = async (req, res, next) => {
    await cartService.deleteCart(req.params.id)
        .then((cart) => res.status(200).json(response.responseFromData(resTEXT.RESPONSE_TEXT.SUCCESS, resTEXT.CART_MESSAGE.DELETE, cart)))
        .catch(err => next(err));
};