const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');
const Bord = require('./bord');
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
db.Bord = Bord
db.File = File

User.init(sequelize);
Comment.init(sequelize);
Bord.init(sequelize);
File.init(sequelize);

User.associate(db);
Comment.associate(db);
Bord.associate(db);
File.associate(db);

module.exports = db;
