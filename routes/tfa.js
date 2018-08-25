const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { isLoggedIn } = require("../middlewares/index");

router.post("/enable/tfa", isLoggedIn, (req, res)=>{
    User.findByIdAndUpdate(req.user._id,{ tfa: true }).then((rUser)=>{
        res.redirect("/dashboard");
    })
});


module.exports = router;