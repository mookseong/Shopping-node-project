const Cart = require("../models/cart");
const Product = require("../models/product")


exports.createCart = (number, userId) => Cart.create({productNum :number, userId : userId});

exports.deleteCart = (number) => Cart.destroy({where: {number}});

exports.getCart = (number) => Cart.findAll({
    where: {number},
    attributes: ['number'],
    include: [{
        model: Product,
        attributes: ['productName', 'productPrice', 'productDescription']
    }]
});

exports.getCart2 = (userId) => Cart.findAll({where: {userId}});