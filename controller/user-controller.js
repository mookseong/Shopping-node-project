const userService = require("../service/user-service");


exports.findUser = async (req, res, next) => {
    res.send(userService.findAllUser(req.params.id));
};

exports.getUser = async (req, res, next) => {
    await userService.findAllUser()
        .then((user) => {
            res.render('user', {
                title: require('../package.json').name,
                port: process.env.PORT,
                users: user.map(user => user.id)
            });
        })
        .catch(err => next(err));
};

exports.createUser = async (req, res, next) => {
    const {id, password, name, description} = req.body;
    await userService.createUser(id, password, name, description)
        .then(() => res.redirect('/'))
        .catch(err => next(err));
};

exports.updateUser = async (req, res, next) => {
    userService.updateUser(req.body.id, req.body.description)
        .then(() => res.redirect('/'))
        .catch(err => next(err));
};

exports.deleteUser = async (req, res, next) => {
    const id = req.params.id;
    userService.deleteUser(id)
        .then(() => res.redirect('/'))
        .catch(err => next(err));
};

