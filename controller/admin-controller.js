const adminService = require('../service/admin-service');
const userService = require("../service/user-service");
const productService = require("../service/product-service");

exports.addUser = async (req, res, next) => {
    const {id, password, name, description} = req.body;
    await adminService.addUser(id, password, name, description)
        .then(() => res.redirect('/'))
        .catch(err => next(err));
};

exports.searchUser = async (req, res, next) => {
    await adminService.searchUser(req.params.id)
        .then((user) => res.json(user))
        .catch(err => next(err));
};

exports.gettingAllUser = async (req, res, next) => {
    await adminService.gettingAllUser()
        .then((user) => {
            if (req.header('User-Agent').toLowerCase().match(/chrome/))
                res.render('user', {
                    title: require('../package.json').name,
                    port: process.env.PORT,
                    users: user.map(user => user.id)
                });
            else
                res.json(user)

        })
        .catch(err => next(err));
};

exports.changeUserInfo = async (req, res, next) => {
    const {id, description} = req.body;
    await adminService.changeUserInfo(id, description)
        .then(() => res.redirect('/'))
        .catch(err => next(err));
};

exports.removeUser = async (req, res, next) => {
    const id = req.params.id;
    await adminService.removeUser(id)
        .then(() => res.redirect('/'))
        .catch(err => next(err));
};


exports.addProduct = async (req, res, next) => {
    const {name, price, description} = req.body;
    await adminService.addProduct(name, price, description)
        .then(() => res.redirect('/'))
        .catch(err => next(err));
};

exports.searchProduct = async (req, res, next) => {
    await adminService.searchProduct(req.params.id)
        .then((products) => res.json(products))
        .catch(err => next(err))
};

exports.gettingAllProduct = async (req, res, next) => {
    await adminService.gettingAllProduct()
        .then((product) => {
            res.render('product', {
                title: require('../package.json').name,
                port: process.env.PORT,
                products: product.map(product => product.productID)
            });
        })
        .catch(err => next(err));
};

exports.changeProductInfo = (req, res, next) => {
    const {id, name, price, description} = req.body;
    adminService.changeProductInfo(id, name, price, description)
        .then(() => res.redirect('/'))
        .catch(err => next(err));
};

exports.removeProduct = (req, res, next) => {
    const id = req.params.id;
    adminService.removeProduct(id)
        .then(() => res.redirect('/'))
        .catch(err => next(err));
};

exports.usersIndex = async (req, res, next) => {
    await adminService.gettingAllUser()
        .then((users) => res.json(users))
        .catch(err => {
            console.error(err);
            next(err);
        })
};

exports.productsIndex = async (req, res, next) => {
    await adminService.gettingAllProduct()
        .then((products) => res.json(products))
        .catch(err => {
            console.error(err);
            next(err);
        })
};