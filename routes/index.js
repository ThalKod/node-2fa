const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");



// rendering signin page
router.get("/", (req, res)=>{
    res.redirect("/login");
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
        console.log(rUser);
        passport.authenticate("local")(req, res, ()=>{
            console.log("registered");
        });
    });
});



router.get("/login", (req, res)=>{
    res.render("login");
});

module.exports = router;