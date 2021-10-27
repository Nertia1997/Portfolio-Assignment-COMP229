//Replaced all instances of var with let.
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//Modules for authentication
let session = require('express-session')
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy
let flash = require('connect-flash');

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

//Setup express session 
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

//Initalize Flash
app.use(flash());

//Intalize Passport
app.use(passport.initialize());
app.use(passport.session());

//Passport User Configuration

//Create a user model instance
let userModel = require('../models/user');
let User = userModel.User;

//Implement  a User Authentication Strategy
passport.use(User.createStrategy());

//Serialize and deserialize user info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
