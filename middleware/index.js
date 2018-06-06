var Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    User = require("../models/user");

var middleObj= {};

// CAMPGROUND OWNERSHIP CHECK
middleObj.checkCampOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err) {
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                } else {
                    res.redirect("back");
                  }
              }
        });
    } else {
        req.flash("error", "You don't have permission to do that!");
        res.redirect("back");
    }
};

// COMMENT OWNERSHIP CHECK
middleObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err) {
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in!");
        res.redirect("back");
    }
};

// USER PROFILE OWNERSHIP CHECK
middleObj.checkUserOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        User.findById(req.params.id, function(err, foundUser){
            if (err) {
                res.redirect("back");
            } else {
                if (foundUser._id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in!");
        res.redirect("back");
    }
};


// IS USER LOGGED IN CKECK
middleObj.isLoggedIn = function (req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in!");
    res.redirect("/login");
};

module.exports = middleObj;