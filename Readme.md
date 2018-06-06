# YelpCamp

A full-stack Node.js multi-user web app with RESTful routing that was completed as a part of Udemy course - [The Web Developer Bootcamp by Colt Steele](https://www.udemy.com/the-web-developer-bootcamp).
Project is a site similar to Yelp.
This version contains a few tweaks beyond what was coded in the class.

## Features

* Authentication
    *  Sign-up
    *  Login with username and password
    *  Admin role - user can sign-up with admin code
    *  Logout

* Authorization
    * Admin can manage all posts, comments and other user profiles
    * Other users cannot edit or delete posts, comments and other users profiles created by other users
    * Users can manage only their posts, comments and profile
    * To create a post or comment user need to sign-up/login
    * Users cannot view other profiles without being authenticated

* Campground posts with basic funcionalities
    * Create posts with basic information (name, price, location, image, description)
    * Edit, update and delete posts and comments on posts
    * Location is displayed with Google Maps
    * Fuzzy Search

* User profile with basic funcionalities
    * Profile page setup with sign-up
    * Edit profile information
    * View list of created post by user

* Forgot and reset password funcionalities
    * Reset password through email
    
* Layout setup and styling
    * header - navigation on all pages 
    * footer - minimal contact info on all pages
    * Bootstrap v4.1
    * Custom CSS3 on landing page
    * Customized default Bootstrap style - minimal
    * Responsive design

* Flash messages responding to interaction with app
* Time since created w/ Moment JS

## Built With

### Platforms used
* [Cloud9](https://c9.io/)

### Back-End
* [async](http://caolan.github.io/async/)
* [body-parser](https://www.npmjs.com/package/body-parser) 
* [connect-flash](https://github.com/jaredhanson/connect-flash)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [express](https://expressjs.com/)
* [express-session](https://github.com/expressjs/session#express-session)
* [node-geocoder](https://www.npmjs.com/package/node-geocoder)
* [method-override](https://github.com/expressjs/method-override)
* [moment](https://www.npmjs.com/package/moment)
* [mongoose](http://mongoosejs.com/)
* [mongoDB](https://www.mongodb.com/)
* [nodemailer](https://nodemailer.com/about/)
* [passport](http://www.passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
* [passport-local-mongoose](https://github.com/saintedlama/passport-local-mongoose)

### Front-End
* [Bootstrap](https://getbootstrap.com/)
* [ejs](http://ejs.co/)
* [Google Maps APIs](https://cloud.google.com/maps-platform/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details