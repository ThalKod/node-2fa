const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const speakeasy = require('speakeasy');



router.post("/:username/secret", (req, res)=>{

    User.findOne({ username: req.params.username }).then((rUser)=>{
        const secret = speakeasy.generateSecret({length: 20});
        console.log(rUser);
        rUser.secret_key = secret.base32;
        rUser.save();

        console.log(rUser);
        res.json({ error: false, data: { secret: secret.base32 }})
    }).catch((e)=>{
        console.log(e);
        res.json({ error: true, data: e})
    });
}); 

module.exports = router;

