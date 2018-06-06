var express    = require("express"),
    router     = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    User    = require("../models/user"),
    middleware = require("../middleware");

// ================ USER PROFILE ROUTES =================

// INDEX - user profile
router.get("/:id", middleware.isLoggedIn, function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    if(err) {
      req.flash("error", "Something went wrong.");
      return res.redirect("/");
    }
    Campground.find().where('author.id').equals(foundUser._id).exec(function(err, foundCampgrounds) {
      if(err) {
        req.flash("error", "Something went wrong.");
        return res.redirect("/");
      }
      res.render("users/show", {user: foundUser, campgrounds: foundCampgrounds});
    });
  });
});

// EDIT - edit user profile
router.get("/:id/edit", middleware.checkUserOwnership, function(req, res) {
    User.findById(req.params.id , function(err, foundUser){
        res.render("users/edit",  {user: foundUser});
    });
});

// UPDATE - updates existing user profile
router.put("/:id", middleware.checkUserOwnership, function(req,res){
  User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
    if(err){
      req.flash("error", err.message);
      res.redirect("/users/:id");
    } else {
      req.flash("success", "Successfully updated!");
      res.redirect("/users/" + updatedUser._id);
          }
  });
});

module.exports = router;