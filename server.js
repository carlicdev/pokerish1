const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session');

const userRoutes = require('./routes/users');
const sessionRoutes = require('./routes/sessions');


                 mongoose.connect('mongodb+srv://CarliC:' 
                 + process.env.MONGO_ATLAS_PW + 
                 '@rest-api-store-cluster-n9gtr.mongodb.net/test?retryWrites=true',
                 {useNewUrlParser: true}
                 );                

                 
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use('/assets', express.static('assets'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    name: 'sid',
    secret: 'unsecreto',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: (5 * 60 * 60 * 1000)}
}
));

app.use('/', userRoutes);
app.use('/', sessionRoutes);

app.get('/', (req, res, next) => res.render('index'));
app.get('/overview',(req, res, next) => res.render('overview'));
app.get('/byplayer', (req, res, next) => res.render('byplayer'));
app.get('/newsession', (req, res, next) => res.render('newsession'));
app.get('/allsessions', (req, res, next) => res.render('allsessions'));
app.get('/logged', (req, res, next) => res.render('logged'));
app.get('/logout', (req, res, next) => res.render('signup'));

app.get('/:id', (req, res, next) => res.status(404).render('404'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Listening'));
