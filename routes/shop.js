const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../utils/path');
const adminData = require('./admin');


router.get('/', (req, res) => {
    res.render('shop', {
        prods: adminData.products,
        docTitle: 'Shop',
        path: '/',
        hasProducts: adminData.products.length > 0,
        activeShop: true,
        productCSS: true // Add this line
    });
});

module.exports = router;