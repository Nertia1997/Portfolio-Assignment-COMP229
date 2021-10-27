let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//Create a reference to the database schema (model)
let Contact_List = require('../models/contact_list');

module.exports.displayContactList = (req, res, next) => {
    Contact_List.find((err, contactList) => {
        if(err){
            return console.error(err);
        }
        else{
            res.render('contact/list', {title: 'Contact List', ContactList: contactList});
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Contact_List.findById(id, (err, contactToEdit) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.render('contact/edit', {title: 'Edit Contact List', contact: contactToEdit});
        }
    });
}

module.exports.ProcessEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedContactList = Contact_List({
        "_id": id,
        "email": req.body.email,
        "contact_name": req.body.contact_name,
        "contact_number": req.body.contact_number
    });

    Contact_List.updateOne({_id: id}, updatedContactList, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/contact-list')
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Contact_List.remove({_id: id}, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/contact-list')
        }
    });
}