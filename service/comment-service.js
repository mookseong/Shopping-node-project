const commentRepository = require("../repository/comment-repository");

exports.findAllComment = async () =>{
    console.log(`[CommentService] 유저정보 요청`)
    return await commentRepository.findAllComment()
};

exports.findAllData = async () =>{
    console.log(`[CommentService] User, Comment 정보 가져오기`)
    return await commentRepository.findAllDataComment()
};