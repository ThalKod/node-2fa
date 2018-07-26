const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const speakeasy = require('speakeasy');
const { isLoggedIn } = require("../../middlewares/index");
const QRCode = require('qrcode');


router.post("/users/secret", isLoggedIn, (req, res)=>{

    User.findOne({ username: req.body.username}).then((rUser)=>{
        const secret = speakeasy.generateSecret({length: 20});
        QRCode.toDataURL(secret.otpauth_url,(err, image_data)=>{
            rUser.secret_key = secret.base32;
            rUser.save();

            res.json({ error: false, data: { secret: secret.base32, secret_uri:  image_data}});
          });
        
    }).catch((e)=>{
        console.log(e);
        res.json({ error: true, data: e})
    });
}); 

module.exports = router;

