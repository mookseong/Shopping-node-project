const bordRepository = require("../repository/bord-repository");

exports.createBord = async (content, img) => {
    await bordRepository.createBord(id, {content, img});
};

exports.updateBord = async (id, content, img) => {
    const result = await bordRepository.updateBord(id, content, img);
    if (!result) throw 'Not updated!';
    console.log(`${id}의 게시글 업데이트 완료`);
};

exports.deleteBord = async (id) => {
    const result = await bordRepository.deleteBord(id);
    if (!result) throw 'No bord to delete!';
    console.log(`${id} 의 게시글 삭제 완료`);
};

exports.getBord = async (id) => {
    const bord = await bordRepository.getBord(id);
    if (!bord) throw `There is no bord with ${id}`;
    return bord;
};