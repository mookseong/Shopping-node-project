const userService = require("../service/user-service");


exports.findUser = async (req, res, next) => {
    await userService.getUser(req.params.id)
        .then((user) => res.json(user))
        .catch(err => next(err));
};

exports.getUser = async (req, res, next) => {
    await userService.findAllUser()
        .then((user) => {
            if (req.header('User-Agent').toLowerCase().match(/chrome/))
                res.render('user', {
                    title: require('../package.json').name,
                    port: process.env.PORT,
                    users: user.map(user => user.id)
                });
            else
                res.json(user)

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
    const {id, description} = req.body;
    await userService.updateUser(id, description)
        .then(() => res.redirect('/'))
        .catch(err => next(err));
};

exports.deleteUser = async (req, res, next) => {
    const id = req.params.id;
    await userService.deleteUser(id)
        .then(() => res.redirect('/'))
        .catch(err => next(err));
};

