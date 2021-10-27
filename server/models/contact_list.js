let mongoose = require('mongoose');

let database = mongoose.conecction
//Create a model class
let contactModel = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    contact_name: String,
    contact_number: String
},
{
    collection: "users"
});

module.exports = mongoose.model('contact_list', contactModel);