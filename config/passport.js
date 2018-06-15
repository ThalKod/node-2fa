const expressSession = require("express-session");
const localStrategy = require("passport-local");
const passport = require("passport");
const User = require("../models/user");


const init = (app)=>{
    app.use((expressSession)({
        secret: "a4f8542071f-c33873-443447-8ee2321",
        resave: false,
        saveUninitialized: false
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.use(new localStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
};  

module.exports = init;
