const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../utils/path');
const adminData = require('./admin');


router.get('/', (req, res) => {
    res.render('shop');
});

module.exports = router;