const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


app.get("/", (req, res)=>{
    res.redirect("/login");
});

app.get("/register", (req, res)=>{
    res.render("register");
})

app.get("/login", (req, res)=>{
    res.render("login");
});


app.listen(5000, ()=>{
    console.log("listenning on 5000");
});


