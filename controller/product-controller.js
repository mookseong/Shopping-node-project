const productService = require("../service/product-service")
const response = require("../data/ResponseFrom")

exports.createProduct = async (req, res, next) => {
    const {name, price, description} = req.body;
    await productService.createProduct(name, price, description, req.user.id)
        .then(() =>
            res.status(200).json(response.responseFromMessage("success","[product]product 추가 완료")))
        .catch(err => next(err));
};

exports.findProduct = async (req, res, next) => {
    await productService.getProduct(req.params.id)
        .then((products) =>
            res.status(200).json(response.responseFromData("success","[product]product 요청 완료", products)))
        .catch(err => next(err));
};

exports.allProduct = async (req, res, next) => {
    await productService.allProduct()
        .then((product) =>
            res.status(200).json((response.responseFromMessage("success","[product]product 업데이트 완료"))))
        .catch(err => next(err));
};

exports.updateProduct = async (req, res, next) => {
    const {id, name, price, description} = req.body;
    await productService.updateProduct(id, name, price, description)
        .then(() => res.status(200).json(response.responseFromMessage("success","[product]product 업데이트 완료")))
        .catch(err => next(err));
};

exports.deleteProduct = async (req, res, next) => {
    const id = req.params.id;
    await productService.deleteProduct(id)
        .then(() => res.status(200).json(response.responseFromMessage("success","[product]product 삭제 완료")))
        .catch(err => next(err));
};