exports.getUserKey = (req, res) => {
    console.log(Object.keys(global.users))
    res.render('user', {
        title: require('../package.json').name,
        port: process.env.PORT,
        users: Object.keys(global.users)
    })
};

exports.getUserKey = (req, res) => {
    console.log(Object.keys(global.users))
    res.render('user', {
        title: require('../package.json').name,
        port: process.env.PORT,
        users: Object.keys(global.users)
    })
};

v