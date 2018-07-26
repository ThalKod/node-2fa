const User = require("../models/user");

module.exports =  {
    isLoggedIn: (req, res, next)=>{
        if(req.isAuthenticated()){
            next();
        }else{
            res.redirect("/login");
        }
    }

    
};