const multer = require("multer");
const path = require("path");
const fs = require("fs");
const userRepository = require("../repository/user-repository")
const DIR = 'data/'
try {
    fs.readdirSync(DIR);
} catch (error) {
    console.log(error)
    fs.mkdirSync(DIR);
}

exports.upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, DIR);
        }, filename(req, file, done) {
            const ext = path.extname(`${req.body.id}.${file.mimetype.replace("image/", "")}`);
            done(null, `${req.body.id}${ext}`);
        }
    }), fileFilter: fileFilter = (req, file, done) => {
        const id = req.body.id;
        const users = userRepository.getUser()
        done(null, !(id in users && req.route.path === `/cid`))
    }
});

exports.multiUpload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, DIR);
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
}).fields([{name: 'files', maxCount: 10}])

exports.isImgFile = (id, req) => {
    const users = userRepository.getUser()
    if (req.file) {
        if ((users[req.body.id].img !== req.file.path)) {
            fs.unlink(`${users[req.body.id].img}`, err => {
                if (err) {
                    console.log(`파일 삭제 Error 발생 : ${err}`);
                }
            });
        }
        return req.file.path
    }
    return users[id].img
};

