require('dotenv').config();
var bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    flash         = require("connect-flash"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    express       = require("express"),
    User          = require("./models/user"),
    seedDB        = require("./seeds"); // requiering seeds 

// REQUIERING ROUTES
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index"),
    userRoutes       = require("./routes/users"),
    pwdRoutes        = require("./routes/users");
    
mongoose.connect("mongodb://localhost/yelpcamp_v11_1");
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the db

// Time when post/comment is created
app.locals.moment = require('moment');

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "I love dogs 666!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //za encode 
passport.deserializeUser(User.deserializeUser());

// FLASH MSGs
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error       = req.flash("error");
  res.locals.success     = req.flash("success");
  next();
});

// ROUTES
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/users", userRoutes);
app.use("/", pwdRoutes);

// SERVER CHECK
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});