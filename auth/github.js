const User = require("../models/user");
const passport = require("passport");
const GitHubStrategy = require('passport-github').Strategy;


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_ID || "",
    clientSecret: process.env.GITHUB_SECRET || "",
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

// passport.serializeUser(function(user, done){
//     console.log("1:",user._id);
//     done(null, user._id);
// });

// passport.deserializeUser(function(id, done){
//     User.findById(id, (err, user)=>{
//         done(err, user);
//     });
// });

module.exports = passport;