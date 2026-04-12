const express = require('express');
const router = express.Router();

const products = [];

router.get('/add-product', (req, res) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    activeShop: false,
    activeAdmin: true,
    productCSS: true,
  });
});

router.post('/add-product', (req, res) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

module.exports = {
  router,
  products,
};