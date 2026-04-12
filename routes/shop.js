const express = require('express');
const router = express.Router();
const adminData = require('./admin');

router.get('/', (req, res) => {
  res.render('shop', {
    pageTitle: 'Shop',
    products: adminData.products,
    hasProducts: adminData.products.length > 0,
    activeShop: true,
    activeAdmin: false,
    productCSS: true,
  });
});

module.exports = router;