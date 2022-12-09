const userService = require("../service/user-service");
const productService = require("../service/product-service");
const response = require("../data/responseFrom");
const resTEXT = require("../data/responseString");

exports.index = async (req, res, next) => res.status(200).send("<h1>안녕하세요 쇼핑몰 프로젝트입니다</h1>개발자 : 임성묵, 김동휘");

exports.usersIndex = async (req, res, next) => {
    await userService.findAllUser()
        .then((users) => res.status(200).json(response.responseFromData(resTEXT.RESPONSE_TEXT.SUCCESS, resTEXT.USER_MESSAGE.GET, users)))
        .catch(err => {
            console.error(err);
            next(err);
        })
};

exports.productsIndex = async (req, res, next) => {
    await productService.allProduct()
        .then((products) => res.status(200).json(response.responseFromData(resTEXT.RESPONSE_TEXT.SUCCESS, resTEXT.PRODUCT_MESSAGE.GET, products)))
        .catch(err => {
            console.error(err);
            next(err);
        })
};