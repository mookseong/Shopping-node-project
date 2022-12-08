const basketService = require("../service/shopping-card-service")
const productService = require("../service/product-service");


exports.addShoppingCart = async (req, res, next) => {
    const {name, price, description} = req.body;
    await productService.createProduct(name, price, description)
        .then(() => res.redirect('/'))
        .catch(err => next(err));
};

exports.allBasketList = async (req, res, next) => {
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