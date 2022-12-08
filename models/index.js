const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');
const Product = require('./product');
const Basket = require('./basket');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Comment = Comment;
db.Basket = Basket;
db.Product = Product;

User.init(sequelize);
Comment.init(sequelize);
Product.init(sequelize);
Basket.init(sequelize);

User.associate(db);
Comment.associate(db);
Product.associate(db);
Basket.associate(db);


module.exports = db;
