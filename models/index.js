const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');
const Board = require('./board');
const File = require('./file');

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
db.Board = Board;
db.File = File

User.init(sequelize);
Comment.init(sequelize);
Board.init(sequelize);
File.init(sequelize);

User.associate(db);
Comment.associate(db);
Board.associate(db);
File.associate(db);

module.exports = db;
