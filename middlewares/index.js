const User = require("../models/user");

module.exports =  {
    isLoggedIn: (req, res, next)=>{
        if(req.isAuthenticated()){
            next();
        }else{
            res.redirect("/login");
        }
    },
    isTfa: (req, res, next)=>{
        User.findById(req.user._id).then((rUser)=>{
            if(rUser.tfa){
                res.redirect("/verification/tfa");
            }else{
                next();
            }
        });
    },
    ensureTfa: (req, res, next)=>{
        User.findById(req.user._id).then((rUser)=>{
            if(rUser.tfa){
                if(rUser.secret_key.authenticated){
                    next();
                }else{
                    res.redirect("/verification/tfa");
                }
            }else{
                next();
            }
        })
    }
};