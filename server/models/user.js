let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

// create a model class
let User = mongoose.Schema({
    username: {
        type: String,
        default: "",
        trim: true,
        required: "username is required"
    },
    email: {
        type: String,
        default: "",
        trim: true,
        required: "email is required"
    },
    displayName: {
        type: String,
        default: "",
        trim: true,
        required: "display name is required"
    },
    created: {
        type: Date,
        default: Date.now
    },
    update: {
        type: Date,
        default: Date.now
    }
},
    {
        collection: "users"
    }
);


//Configure options for user

let options = ({ missingPasswordError: 'Wrong / Missing Password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);