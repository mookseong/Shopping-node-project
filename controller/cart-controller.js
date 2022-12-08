const cartService = require("../service/cart-service")

exports.addShoppingCart = async (req, res, next) => {
    await cartService.createCart(req.params.id, req.user.id)
        .then(() => res.redirect('/'))
        .catch(err => next(err));
};

exports.allCartList = async (req, res, next) => {
    await cartService.getCart(req.user.id)
        .then((cart) => {
            if (req.header('User-Agent').toLowerCase().match(/chrome/))
                res.render('cart', {
                    title: require('../package.json').name,
                    port: process.env.PORT,
                    products: cart.map(cart => cart)
                });
            else
                res.json(cart)
        })
        .catch(err => next(err));
};

exports.deleteCartList = async (req, res, next) => {
    await cartService.deleteCart(req.params.id)
        .then((cart) => {
            res.render('cart', {
                title: require('../package.json').name,
                port: process.env.PORT
            });
        })
        .catch(err => next(err));
};