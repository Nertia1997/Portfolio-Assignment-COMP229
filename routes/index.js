let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

//Route for the About Me Page
router.get('/aboutMe', function(req, rest, next){
  rest.render('aboutMe', {title: 'About Me'})
});

//Route for the Projects Page
router.get('/projects', function(req, rest, next){
  rest.render('projects', {title: 'Projects'})
});

//Route for the Services Page
router.get('/services', function(req, rest, next){
  rest.render('services', {title: 'Available Services'})
});

//Route for the Contact Page
router.get('/contact', function(req, rest, next){
  rest.render('contact', {title: 'Contact Me'})
});

module.exports = router;
