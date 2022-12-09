const Cart = require("../models/cart");
const Product = require("../models/product")


exports.createCart = (number, userId) => Cart.create({productNum :number, userId : userId});

exports.deleteCart = (number) => Cart.destroy({where: {number}});

exports.getCart = (userId) => Cart.findAll({where: {userId}});