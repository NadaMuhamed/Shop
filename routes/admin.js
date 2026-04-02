const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../utils/path');

const products = [];

router.get('/add-product', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res) => {
    console.log(req.body);
    products.push({ title: req.body.title });
    res.redirect('/');
});

module.exports = {
    router,
    products

}
