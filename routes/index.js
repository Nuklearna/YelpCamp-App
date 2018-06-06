var express       = require("express"),
    router        = express.Router(),
    passport      = require("passport"),
    User          = require("../models/user");
    
router.get("/", function(req, res){
    res.render("landing");//renderiramo landing.ejs
});

// ================ AUTH ROUTES =================

// INDEX - shows sign up page
router.get("/register", function(req, res){
    res.render("register", {page: 'register'});
});

// Handles sign up logic
router.post("/register", function(req, res){
    var newUser = new User({
        username: req.body.username, 
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        email: req.body.email, 
        avatar: req.body.avatar
    });
    if (req.body.adminCode === 'secretcode666') {
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
          req.flash("success", "Welcome to YelpCamp" + " " + req.body.username);
          res.redirect("/campgrounds"); 
        });
    });
});

// LOGIN - shows login page
router.get("/login", function(req, res){
    res.render("login", {page: 'login'});
});

// Login logic /middleware
router.post("/login",  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
});

// LOGOUT
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;