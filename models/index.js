const Sequelize = require('sequelize');
const User = require('./user');
const Product = require('./product');
const Basket = require('./cart');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Cart = Basket;
db.Product = Product;

User.init(sequelize);
Product.init(sequelize);
Basket.init(sequelize);

User.associate(db);
Product.associate(db);
Basket.associate(db);


module.exports = db;
