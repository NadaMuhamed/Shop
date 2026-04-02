const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const rootDir = require('./utils/path');

const app = express();
const PORT = process.env.PORT;


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'Public')));

app.use('/admin', adminRoutes);
app.use('/', shopRoutes);

app.use((req, res) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});


app.listen(PORT);