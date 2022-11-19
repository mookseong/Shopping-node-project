const bordRepository = require("../repository/bord-repositody")
const fs = require("fs");
const userRepository = require("../repository/user-repository");

exports.updateBord = (seq, title, content) => {
    const bord = bordRepository.getAllBord()
    if (seq in bord) {
        bordRepository.setBord(seq, title, content);
        return `업데이트 완료 ID: ${seq}`
    }
    return `존재하지 않은 ID: ${seq}`;
};

exports.createBord = (title, content) => {
    bordRepository.setBord(Math.floor(Math.random() * 10000), title, content)
    return `등록 성공`;
};
exports.readBord = (seq) => {
    const bord = bordRepository.getAllBord()
    if (seq in bord) {
        return bordRepository.getBord(seq);
    } else {
        return `존재하지 않은 ID: ${seq}`;
    }
};

exports.deleteBord = (seq) => {
    const bord = bordRepository.getAllBord()
    if (seq in bord) {
        bordRepository.deleteBord(seq)
        return `삭제완료 ID: ${seq}`;
    } else {
        return `존재하지 않은 ID: ${seq}`;
    }

};

exports.allBord = (seq) => bordRepository.getAllBord()