const LocalStrategy = require("passport-local");
const User = require("../models/user");
const passport = require("passport");
 
 // Using local strategy
passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(function(user, done){
    done(null, user._id);
});

passport.deserializeUser(function(id, done){

    User.findById(id, (err, user)=>{
        done(null, user);
    });
});

module.exports = passport;