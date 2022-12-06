const Comment = require("../models/comment");
const User = require("../models/user");

exports.findAllComment = () => Comment.findAll({});

exports.findAllDataComment = () => User.findAll({
    attributes: ['id', 'name', 'description'],
    include: {
        model: Comment
    }
});