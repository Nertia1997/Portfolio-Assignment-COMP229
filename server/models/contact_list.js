let mongoose = require('mongoose');

//Create a model class
let contactModel = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    contact_name: String,
    contact_number: String
},
{
    collection: "contacts"
});

module.exports = mongoose.model('contact_list', contactModel);