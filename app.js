const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/user");
const passport = require("passport");
const localStartegy = require("passport-local");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const routes  = require("./routes/index");

// Configure app
app.set("view engine", "ejs");

// middlewares
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(routes);

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

// passport configuration
app.use((expressSession)({
    secret: "a4f8542071f-c33873-443447-8ee2321",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStartegy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());







