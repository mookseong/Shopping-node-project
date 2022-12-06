const Product = require("../models/product");

exports.createProduct = (num, name, price, description) => Product.create({num, name, price, description});

exports.getProduct = async (num) => {
    return await Product.findOne({where: {num}});
}

exports.allProduct = async () => {
    return await Product.findAll({});
}

exports.updateProduct = (num, name, price, description) => Product.update({
    name: name,
    price: price,
    description: description
}, {
    where: {num}
});

exports.deleteProduct = (num) => Product.destroy({where: {num}});