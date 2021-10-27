//Require modules for the User Model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose')

let User = mongoose.Schema({
    username:
    {
        type: String,
        default: '',
        trim: true,
        required: 'username is required'
    },
    password:
    {
        type: String,
        default: '',
        trim: true,
        required: 'password is required'
    }
},
{
    collection: "users"
});

//Configure options for User Model
let options = ({missingPasswordError: 'wrong / missing password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);