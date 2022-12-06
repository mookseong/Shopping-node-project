const express = require('express');
const Product = require("../models/product");

const router = express.Router();


router.route('/')
    .get(async (req, res, next) => {
        try {
            const products = await Product.findAll({
                attributes: ['num']
            });

            res.render('product', {
                title: require('../package.json').name,
                port: process.env.PORT,
                products: products.map(products => products.num)
            });
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        const { num, name, price, description } = req.body;

        const product = await Product.findOne({ where: { num } });
        if (product) {
            next('이미 등록된 상품 번호입니다.');
            return;
        }

        try {
            await Product.create({
                num,
                name,
                price,
                description
            });

            res.redirect('/');
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

router.post('/update', async (req, res, next) => {
    try {
        const result = await Product.update({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        }, {
            where: { num: req.body.num }
        });

        if (result) res.redirect('/');
        else next(`There is no product with ${req.params.num}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/delete/:num', async (req, res, next) => {
    try {
        const result = await Product.destroy({
            where: { num: req.params.num }
        });

        if (result) next();
        else next(`There is no product with ${req.params.num}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/:num', async (req, res, next) => {
    try {
        const product = await Product.findOne({
            where: {num: req.params.num},
            attributes: ['num', 'name', 'price', 'description']
        });
        if (product) res.json(product);
        else next(`There is no product with ${req.params.num}`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
