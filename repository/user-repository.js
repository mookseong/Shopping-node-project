const User = require('../models/user');

exports.getUser = (id) => User.findOne({where: {id}, attributes: ['id', 'name', 'description']});

exports.getUserPermission = (id) => User.findOne({where: {id}, attributes: ['permission']});

exports.addAdmin = (id) => User.update({permission: true}, {where: {id}});

exports.denyAdmin = (id) => User.update({permission: false}, {where: {id}});

exports.findUserById = (id) => User.findOne({where: {id}});

exports.findAllUser = () => User.findAll({attributes: ['id', 'name', 'description']});

exports.createUser = (id, password, name, description) => User.create({
    id, password, name, description, permission: false
});

exports.deleteUser = (id) => User.destroy({where: {id}});

exports.updateUser = (id, description) => User.update({description}, {where: {id}});
