const express = require("express");
const speakeasy = require('speakeasy');
const router = express.Router();
const User = require("../models/user");
const { isLoggedIn } = require("../middlewares/index");


router.post("/enable/tfa", isLoggedIn, (req, res)=>{
    User.findById(req.user._id).then((rUser)=>{
        if(!rUser){
            res.redirect("/");
        }

        const secretBase32 = rUser.secret_key

        const verified = speakeasy.totp.verify({
            secret: secretBase32,
            encoding: 'base32',
            token: req.body.tfa
          });
          
        if(verified){
            rUser.tfa = true;
            rUser.save();
        }
        res.redirect("/dashboard");
    }).catch((err)=>{
        console.log(err);
    })
});


module.exports = router;