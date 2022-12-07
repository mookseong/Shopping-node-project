const Product = require("../models/product");
const Sequelize = require("sequelize");

exports.createProduct = (productName, productPrice, productDescription) => Product.create({
    productName, productPrice, productDescription
});

exports.getProduct = (productID) => Product.findOne({
    where: {productID}, attributes: ['productID', 'productName', 'productPrice', 'productDescription']
});

exports.allProduct = () => Product.findAll({});

exports.allProductList = () => Product.findAll({attributes: ['productID']});

exports.updateProduct = (productID, productName, productPrice, productDescription) => Product.update({
    productName,
    productPrice,
    productDescription
}, {where: {productID}});

exports.deleteProduct = (productID) => Product.destroy({where: {productID}});

