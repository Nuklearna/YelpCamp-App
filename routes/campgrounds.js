var express    = require("express"),
    router     = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware"),
    NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);


// ================ CAMPGROUND ROUTES =================
    
// INDEX - Show all campgrounds
router.get("/", function(req, res){
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campground.find({name: regex}, function(err, searchResults){
            if(err){
            console.log(err);
            } else {
                if (searchResults.length < 1) {
                    req.flash('error', 'Sorry, no campgrounds match your search. Please try again!');
                    return res.redirect('/campgrounds');
                }
                res.render('campgrounds/index', {campgrounds: searchResults, page: 'campgrounds' });
            }
        });
    } else {
        Campground.find({}, function(err, Allcampgrounds){
            if(err){
                console.log(err);
            } else {
                res.render("campgrounds/index", {campgrounds:Allcampgrounds, page: 'campgrounds'});
            }
        });
    }
});

// CREATE - add  new campground
router.post("/", middleware.isLoggedIn, function(req, res){
    // Get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    // Google Maps
   geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
        var lat = data[0].latitude;
        var lng = data[0].longitude;
        var location = data[0].formattedAddress;
        var newCampground = {name: name, price: price, image: image, description: description, author: author, location: location, lat: lat, lng: lng};
        //create a new campground and save to db
        Campground.create(newCampground, function(err, newlyCreated){
            if(err){
                console.log(err);
            } else {
                console.log("newlyCreated");
                res.redirect("/campgrounds");
            }
        });
    });
});


//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//SHOW - shows more info about campground
router.get("/:id", function(req, res) {
    //find campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if (err) {
          console.log(err);
      } else {
          console.log(foundCampground);
          //render show template with that capmground
          res.render("campgrounds/show",  {campground: foundCampground});
      }
    });
});

// EDIT - edit campground
router.get("/:id/edit", middleware.checkCampOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit",  {campground: foundCampground});
    });
});

// UPDATE - update existing campground
router.put("/:id", middleware.checkCampOwnership, function(req,res){
    // Google Maps
     geocoder.geocode(req.body.location, function (err, data) {
        if (err || !data.length) {
          req.flash('error', 'Invalid address');
          return res.redirect('back');
        }
        req.body.campground.lat = data[0].latitude;
        req.body.campground.lng = data[0].longitude;
        req.body.campground.location = data[0].formattedAddress;
        
        Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
            if(err){
                req.flash("error", err.message);
                res.redirect("/campgrounds");
            } else {
                req.flash("success", "Successfully updated!");
                res.redirect("/campgrounds/" + updatedCampground._id);
            }
        }); 
    });
});


// DESTROY - deletes campground
router.delete("/:id", middleware.checkCampOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
   });
});

// Regex escape 
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;