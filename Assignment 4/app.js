let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let FileStore = require('session-file-store')(session);
let passport = require('passport');
let authenticate = require('./authenticate');
let config = require('./config');


let mongoose = require('mongoose');

let Dishes = require('./models/dishes');

let url = config.mongoUrl;
let connect = mongoose.connect(url, {useNewUrlParser: true});

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => {
    console.log(err);
});

let indexRouter = require('./routes/index')
let usersRouter = require('./routes/users')
let dishRouter = require('./routes/dishRouter')
let promoRouter = require('./routes/promoRouter')
let leaderRouter = require('./routes/leaderRouter')
let uploadRouter = require('./routes/uploadRouter');
let favoriteRouter = require('./routes/favoriteRouter');

let app = express();

// Secure traffic only
app.all('*', (req, res, next) => {
    if (req.secure) {
        return next();
    }
    else {
        res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
    }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser('12345-67890-09876-54321'));

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
app.use('/imageUpload',uploadRouter);
app.use('/favorites',favoriteRouter);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
