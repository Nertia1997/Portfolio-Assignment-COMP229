let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

//Route for the About Me Page
router.get('/aboutMe', indexController.displayAboutPage);

//Route for the Projects Page
router.get('/projects', indexController.displayProjectsPage);

//Route for the Services Page
router.get('/services', indexController.displayServicesPage);

//Route for the Contact Page
router.get('/contact', indexController.displayContactPage);

//Route for Login Page
router.get('/login', indexController.displayLoginPage);

//Route for Processing Login Page
router.post('/login', indexController.processLoginPage);

//Route for Register Page
router.get('/register', indexController.displayRegisterPage);

//Route for processing register page
router.post('/register', indexController.processRegisterPage);

//Route for performing UserLogout
router.get('/logout', indexController.performLogout);

module.exports = router;