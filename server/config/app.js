//Replaced all instances of var with let.
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//Database setup
let mongoose = require('mongoose');
let DB = require('./db');

//Point Mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=> {
  console.log('Connected to MongoDB...');
})

//These are what setup our routes to be used for the web pages.
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let contactRouter = require('../routes/contact_list');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));

//Question 3 C), all routes will be referenced here from the indexRouter (index.js file in routes folder) to route all site pages.
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/aboutMe', indexRouter);
app.use('/projects', indexRouter);
app.use('/services', indexRouter);
app.use('/contact', indexRouter);
app.use('/contact-list', contactRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
