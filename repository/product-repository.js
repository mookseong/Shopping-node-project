const Product = require("../models/product");

exports.createProduct = (name, price, description) => Product.create({name, price, description});

exports.getProduct = (id) => Product.findOne({
    where: {id}, attributes: ['id', 'name', 'price', 'description']
});

exports.allProduct = () => Product.findAll({});

exports.updateProduct = (id, name, price, description) => Product.update({
    name: name,
    price: price,
    description: description
}, {
    where: {id: id}
});

exports.deleteProduct = (id) => Product.destroy({where: {id}});