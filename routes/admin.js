const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../utils/path');

router.get('/add-product', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    // res.send(`
    //     <form action="/admin/add-product" method="POST">
    //         <input type="text" name="title">
    //        <button type="submit">Add Product</button>
    //   </form>
    // `);
});

router.post('/add-product', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;