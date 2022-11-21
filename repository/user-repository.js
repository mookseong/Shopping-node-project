import User from "../models/user";


exports.findUserById = (id) => User.findOne({where: {id}});

exports.deleteUser = (id) => User.destroy({where: {id: id}});

exports.getUser = (id) => User.findOne({
    where: {id: id}, attributes: ['id', 'name', 'description']
});