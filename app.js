const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Configure app
app.set("view engine", "ejs");

// middlewares
app.use(express.static(__dirname + "/public"));

// configure mongoose and DB connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/node2fa", { reconnectTries: Number.MAX_VALUE }).then((db =>{
    // boot
    app.listen(5000, ()=>{
        console.log("listenning on 5000");
    });
})).catch(dbErr =>{
    console.log("Connection Error : ", dbErr.message);
    process.exit(1);
});



// Routes
app.get("/", (req, res)=>{
    res.redirect("/login");
});

app.get("/register", (req, res)=>{
    res.render("register");
})

app.get("/login", (req, res)=>{
    res.render("login");
});





