const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const rootDir = require('./utils/path');

const app = express();
const PORT = process.env.PORT || 3000;

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'Public')));

app.use('/admin', adminRoutes.router);
app.use('/', shopRoutes);

app.use((req, res) => {
  res.status(404).render('404', {
    pageTitle: 'Page Not Found',
    activeShop: false,
    activeAdmin: false,
    productCSS: false,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});