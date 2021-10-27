let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//Create the User Model instnace
let userModel = require('../models/user');
let User = userModel.User; //Alias

//Controller for index.js routes and is controller seperation logic
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home'});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('aboutMe', {title: 'About Nicholas Harris'});
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('projects', {title: 'Projects'});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('services', {title: 'Available Services'});
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('contact', {title: 'Contact Me'});
}

module.exports.displayLoginPage = (req, res, next) => {
    //Check if the user is already logged in
    if(!req.user){
        res.render('auth/login', {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.username : ''
        })
    }
    else{
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        //Server err?
        if(err){
            return next(err)
        }
        if(!user){
            req.flash('loginMEssage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //Server error?
            if(err){
                return next(err);
            }
            return res.redirect('/contact-list')
        });
    })(req, res, next);
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    req.redirect('/');
}