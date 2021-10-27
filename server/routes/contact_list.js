let express = require('express')
let router = express.Router();
let mongoose = require('mongoose');

//Connect to user model
let Contact_List = require('../models/contact_list');

//Get Route for the user list page
router.get('/', (req, res, next) => {
    Contact_List.find((err, contactList) => {
        if(err){
            return console.error(err);
        }
        else{
            res.render('contact_list', {title: 'Contact List', ContactList: contactList});
        }
    });
});

module.exports = router;