const bordService = require("../service/bord-service")


exports.allNotice = (req, res, next) =>{
    res.send(JSON.stringify(bordService.allBord()));
}

exports.addNotice = (req, res, next) => {
    const {title, content} = req.body;
    res.send(bordService.createBord(title, content))
};

exports.updateNotice = (req, res, next) => {
    console.log(req.body)
    res.send(bordService.updateBord(req.body.id, req.body.title, req.body.content))
};

exports.deleteNotice = (req, res, next) => {
    res.send(bordService.deleteBord(req.query.id))
};

exports.readNotice = (req, res, next) => {
    res.send(bordService.readBord(req.query.id))
};

exports.imgMultiUpload = (req, res, next) => {

};
