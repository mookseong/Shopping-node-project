const clone = require("node-clone-js");

users = {}

exports.getUser = () => clone(users)
exports.setUser = (id, name, birth, gender, img) => {
    users[id] = {name: `${name}`, birth: `${birth}`, gender: `${gender}`, img: `${img}` }
};
exports.deleteUser = (id) =>{
    delete users[id];
}