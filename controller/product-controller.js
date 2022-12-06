const productService = require("../service/product-service")

exports.createProduct = (req, res, next) => {
    const {num, name, price, description} = req.body;

    productService.createProduct(num, name, price, description)
        .then(() => res.redirect('/'))
        .catch(
            err => {
                next(err);
                console.log(`Product created failed. Error : ${err}`);
            }
        );
};

exports.findProduct = async (req, res) => { // req를 인자로 넘기니까 req요청이 없는 상태에서 undefined 참조하는 거 같음
    const product = await productService.getProduct(req.body.num);
    res.json(product);
};

exports.allProduct = (req, res) => { // 여기도..
    res.send(JSON.stringify(productService.allProduct()));
};

exports.updateProduct = (req, res, next) => {
    productService.updateProduct(req.body.num, req.body.name, req.body.price, req.body.description)
    .then(() => res.redirect('/'))
    .catch(
        err => {
            next(err);
            console.log(`Product update failed. Error : ${err}`);
        }
    );
};

exports.deleteProduct = (req, res, next) => {
    const num = req?.query?.num;
    productService.deleteProduct(num)
        .then(() => res.redirect('/'))
        .catch(
            err => {
                next(err);
                console.log(`'Product delete failed. Error : ${err}`);
            }
        );
};