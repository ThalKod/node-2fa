const express = require("express");
const router = express.Router();


// Routes
router.get("/", (req, res)=>{
    res.redirect("/login");
});

router.get("/register", (req, res)=>{
    res.render("register");
})

router.get("/login", (req, res)=>{
    res.render("login");
});

module.exports = router;