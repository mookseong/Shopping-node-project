const Board = require("../models/board");

exports.createBoard = (num, title, content) => Board.create({num, title, content});

exports.getBoard = (num) => Board.findOne({where: {num}});

exports.allBoard = () => Board.findAll({
    attributes: ['num', 'title', 'content']
});

exports.updateBord = (num, title, content) => Board.update({
    title: title,
    content: content
}, {
    where: {num}
});

exports.deleteBoard = (num) => Board.destroy({where: {num}});