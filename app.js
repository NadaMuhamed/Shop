const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
require('dotenv').config();
const path = require('path');
const rootDir = require('./utils/path');

const app = express();
const PORT = process.env.PORT;


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.engine('hbs', expressHbs({ layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'Public')));

app.use('/admin', adminRoutes.router);
app.use('/', shopRoutes);

app.use((req, res) => {
    res.status(404).render('404');
});


app.listen(PORT);