const boardService = require("../service/board-service")

exports.createBoard = (req, res, next) => {
    const {num, title, content} = req.body;

    boardService.createBoard(num, title, content)
        .then(() => res.redirect('/'))
        .catch(
            err => {
                next(err);
                console.log(`Board created failed. Error : ${err}`);
            }
        );
};

exports.findBoard = async (req, res) => {
    res.send(boardService.getBoard(req.body.num));
};

exports.allBoard = (req, res) => {
    res.send(JSON.stringify(boardService.allBoard()));
};

exports.updateBoard = (req, res, next) => {
    boardService.updateBoard(req.body.num, req.body.title, req.body.content)
    .then(() => res.redirect('/'))
    .catch(
        err => {
            next(err);
            console.log(`Board update failed. Error : ${err}`);
        }
    );
};

exports.deleteBoard = (req, res, next) => {
    const num = req?.query?.num;
    boardService.deleteBoard(num)
        .then(() => res.redirect('/'))
        .catch(
            err => {
                next(err);
                console.log(`'Board delete failed. Error : ${err}`);
            }
        );
};