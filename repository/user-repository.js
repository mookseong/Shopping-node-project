const User = require('../models/user');

exports.findUserById = (id) => User.findOne({where: {id}});

exports.createUser = (id, hash, name, description) => User.create({id, password: hash, name, description});

exports.deleteUser = (id) => User.destroy({where: {id: id}});

exports.getUser = (id) => User.findOne({
    where: {id: id}, attributes: ['id', 'name', 'description']
});

exports.updateUser = (id, description) => User.update({
    description: description
}, {
    where: {id: id}
});
