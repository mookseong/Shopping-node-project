const productService = require("../service/product-service")

exports.createProduct = async (req, res, next) => {
    const {name, price, description} = req.body;
    await productService.createProduct(name, price, description)
        .then(() => res.redirect('/'))
        .catch(err => next(err));
};

exports.findProduct = async (req, res, next) => {
    await productService.getProduct(req.params.id)
        .then((products) => res.json(products))
        .catch(err => next(err))
};

exports.allProduct = async (req, res, next) => {
    await productService.allProduct()
        .then((product) => {
            res.render('product', {
                title: require('../package.json').name,
                port: process.env.PORT,
                products: product.map(product => product.productID)
            });
        })
        .catch(err => next(err));
};

exports.updateProduct = (req, res, next) => {
    const {id, name, price, description} = req.body;
    productService.updateProduct(id, name, price, description)
         .then(() => res.redirect('/'))
         .catch(err => next(err));
};

exports.deleteProduct = (req, res, next) => {
    const id = req.params.id;
    productService.deleteProduct(id)
        .then(() => res.redirect('/'))
        .catch(err => next(err));
};