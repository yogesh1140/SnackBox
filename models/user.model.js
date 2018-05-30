var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: {type:String},
    email:{type:String},
    mobile:{type:Number},
    gender:{type:String},
    password:{type:String},
} ,{ 
    collection: 'users' , 
    versionKey: false
});

// User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);