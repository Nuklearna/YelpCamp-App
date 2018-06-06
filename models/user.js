var mongoose              = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

// USER SCHEMA SETUP - what user model require     
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    avatar: String,
    firstName: String,
    lastName: String,
    email: {
        type: String, 
        unique: true, 
        required: true
    },
    aboutMe: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);

