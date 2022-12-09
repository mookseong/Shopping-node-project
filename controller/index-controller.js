const userService = require("../service/user-service");
const productService = require("../service/product-service");
const response = require("../data/ResponseFrom");


exports.usersIndex = async (req, res, next) => {
    await userService.findAllUser()
        .then((users) => res.status(200).json(response.responseFromData("success","[user]유저 정보 요청 완료", users)))
        .catch(err => {
            console.error(err);
            next(err);
        })
};

exports.productsIndex = async (req, res, next) => {
    await productService.allProduct()
        .then((products) => res.status(200).json(response.responseFromData("success","[product]모든 제품 요청 완료", products)))
        .catch(err => {
            console.error(err);
            next(err);
        })
};