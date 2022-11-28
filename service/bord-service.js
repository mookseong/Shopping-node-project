const Bord = require("../models/bord");
const User = require("../models/user");
const fs = require('fs');

exports.createBord = async(req, res, next) => {
    const content = req.body.content;
    const img = req.body.url;
    const userId = req.user.id;

    try {
        await Bord.create({content, img, userId});
        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err)
    }
};

exports.readBord = async(req, res, next) => {
    try {
        const user = await User.findOne({
            where: {id: req.params.id}
        });
        if (user) {
            const content = await user.getContent();
            res.json(content);
        } else {
            next(`There is no user with ${req.params.id}.`);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.updateBord = async(req, res, next) => {
    try {
        const result = await Bord.update({
            content: req.body.content,
            img: req.body.url,
        }, {where: { id: req.body.id}});

        if (result) res.redirect('/');
        else next('Not updated!');
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.deleteBord = async(req, res, next) => {
    try {
        const checkImage = await Bord.findOne({ where: {id: req.params.id}});
        if (checkImage) {
            console.log(checkImage.img);
            try {
                fs.unlinkSync(`uploads/${checkImage.img.slice(5)}`)
            } catch (err) {
                if (err.code === "ENOENT") {
                    console.log("파일이 존재하지 않습니다.");
                }
            }
        }
        const result = await Bord.destroy({ where: {id: req.params.id}});
        if (result) {
            res.json(result);
        } else {
            res.status(404).send('No bord to delete');
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.join = async(req, res, next) => {
    try {
        const user = await User.findOne({
            where: {id: req.params.id},
            attributes: [],
            include: [{
                model: Bord,
                attributes: ['content', 'img']
            }]
        });
        res.json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
};