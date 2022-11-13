const clone = require("node-clone-js");

seq = 0;
bord = {};


exports.getBord = (seq) => {
    if (seq in bord) {
        return bord[seq];
    }
    return '게시글 없음';
};

exports.getAllBord = (seq) => clone(bord);
exports.setBord = (seq, title, content) => {
    bord[seq] = {title: `${title}`, content: `${content}`};
};
exports.deleteBord = (seq) => {
    delete bord[seq];
};