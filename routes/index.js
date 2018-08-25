const express = require("express");
const router = express.Router();
const User = require("../models/user");
const middlewares = require("../middlewares/index");
const passportLocal = require("../auth/local");
const passportGithub = require("../auth/github");



// rendering signin page
router.get("/", (req, res)=>{
    res.redirect("/login");
});

// rendering the dashboard
router.get("/dashboard", middlewares.isLoggedIn, (req, res)=>{
    User.findById(req.user.id).then((rUser)=>{
        if(!rUser){
            return res.redirect("/login");
        }
        let isChecked = rUser.tfa;
        res.render("dashboard", {username: rUser.username, isChecked});
    })
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
        passportLocal.authenticate("local")(req, res, ()=>{
            res.redirect("/dashboard");
        });
    });
});


// rendering the login page
router.get("/login", (req, res)=>{
    if(req.user){
        return res.redirect("/dashboard");
    }
    res.render("login");
});

// handling login
router.post("/login", passportLocal.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login"
}), (req, res)=>{
    console.log("login");
});

// hanling login with github
router.get('/login/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }),
    (req,res)=>{
        // console.log("In /login/github :",req.user);
    }
);

// Github Oauth Callback
router.get('/auth/github/callback', passportGithub.authenticate('github', { failureRedirect: '/login' }),
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