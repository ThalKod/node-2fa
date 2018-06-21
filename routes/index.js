const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const middlewares = require("../middlewares/index");


// rendering signin page
router.get("/", (req, res)=>{
    res.redirect("/login");
});

// rendering the dashboard
router.get("/dashboard", middlewares.isLoggedIn, (req, res)=>{
    res.send("Dashboard");
});

// rendering registration page
router.get("/register", (req, res)=>{
    res.render("register");
});

// handling registration
router.post("/register", (req, res)=>{
    const user = {username: req.body.username};
    User.register(user, req.body.password, (err, rUser)=>{
        if(err){
            console.log(err);
            res.render("register");
        }
        passport.authenticate("local")(req, res, ()=>{
            res.redirect("/dashboard");
        });
    });
});


// rendering the login page
router.get("/login", (req, res)=>{
    res.render("login");
});

// handling login
router.post("/login", passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login"
}), (req, res)=>{
    console.log("login");
});

// hanling login with github
router.get('/login/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

// Github Oauth Callback
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res)=> {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });


// loggin out
router.get("/logout", (req, res)=>{
    req.logout();
    res.redirect("/");
});


module.exports = router;