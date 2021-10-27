let express = require('express')
let router = express.Router();
let mongoose = require('mongoose');

//Helper function for guard purposes
function requireAuth(req, res, next){
    //Check if the user is logged in
    if(!req.isAuthenticated()){
        return res.redirect('/login')
    }
    next();
}

//Connect to user model
let Contact_List = require('../models/contact_list');

let contactController = require('../controllers/contact_list');

//Get Route for the user list page
router.get('/', contactController.displayContactList);

//GET Route for displaying the Edit page - UPDATE Operation
router.get('/edit/:id', requireAuth, contactController.displayEditPage);

//POST Route for processing the Edit page - Update Operation
router.post('/edit/:id', requireAuth, contactController.ProcessEditPage);

//Get to perform Deletion - DELETE Operation
router.get('/delete/:id', requireAuth, contactController.performDelete);

module.exports = router;