const expressSession = require("express-session");
const LocalStrategy = require("passport-local");
const passport = require("passport");
const User = require("../models/user");
const GitHubStrategy = require('passport-github').Strategy;


const init = (app)=>{
    app.use((expressSession)({
        secret: "a4f8542071f-c33873-443447-8ee2321",
        resave: false,
        saveUninitialized: false
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    // Using local strategy
    passport.use(new LocalStrategy(User.authenticate()));

    // Using Github strategy
    passport.use(new GitHubStrategy({
        clientID: "4f3f36e197ac1a9a02e3",
        clientSecret: "795f00b3bc749bea43a6f58ad4df1c29b07bd604",
        callbackURL: "http://127.0.0.1:5000/auth/github/callback"
      },
      (accessToken, refreshToken, profile, cb) => {
        User.findOne({githubId: profile.id}).then((rUser)=>{
            if(!rUser){
                console.log(profile);
                user = new User({
                    username: profile.username,
                    githubId: profile.id
                });

                user.save((err)=>{
                    if(err) console.log(err);
                    cb(err,user);
                });
            }else{
                return cb(null,rUser);
            }
        }).catch((err)=>{
            cb(err);
        });
      }
    ));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
};  

module.exports = init;
