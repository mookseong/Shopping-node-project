const boardRepository = require("../repository/board-repository");

exports.createBoard = async (num, title, content) => {
    const result = await boardRepository.getBoard(num);
    if (result) throw '동일한 게시글 번호가 존재합니다.';
    await boardRepository.createBoard(num, title, content);
};

exports.getBoard = async (num) => {
    const board = await boardRepository.getBoard(num);
    if (!board) throw `Post ${num} does not exist!`;
    return board;
};

exports.allBoard = async () => await boardRepository.allBoard();

exports.updateBoard = async (num, title, content) => {
    const result = await boardRepository.updateBord(num, title, content);
    if (!result) throw 'Not updated!';
    console.log(`${num}번 게시글 업데이트 완료`);
};

exports.deleteBoard = async (num) => {
    const result = await boardRepository.deleteBoard(num);
    if (!result) throw 'No board to delete!';
    console.log(`${num}번 게시글 삭제 완료`);
};