const Bord = require("../models/bord");

exports.createBord = (content, img) => Bord.create({id: {content, img}});

exports.deleteBord = (id) => Bord.destory({where: {id}});

exports.getBord = (id) => Bord.findOne({
    where: {id: id}, attributes: ['id', 'content', 'img']
});

exports.updateBord = (id, content, img) => Bord.update({
    content: content,
    img: img
}, {where: {id: id}});