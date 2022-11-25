const multer = require('multer');
const path = require('path');
const fs = require('fs');
const DIR = 'data/'

try {
    fs.readdirSync(DIR);
} catch (error) {
    fs.mkdirSync(DIR);
}

exports.upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, DIR);
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }), fileFilter(req, file, done) {   // image 형식의 파일만 허용
        done(null, (file.mimetype.lastIndexOf('image') > -1));
    },
    limits: {fileSize: 5 * 1024 * 1024} // 최대 파일사이즈: 5MB
}).fields([{name: 'files', maxCount: 10}]);