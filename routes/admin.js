const express = require('express');
const router = express.Router();
const aadminController = require('../controller/products');
const path = require('path');


router.get('/add-product', aadminController.getAddProduct);

router.post('/add-product', aadminController.postAddProduct);

module.exports = {
  router
};