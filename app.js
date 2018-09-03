const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const routes  = require("./routes/index");
const ajax = require("./routes/ajax/index");
const tfa = require("./routes/tfa");
const expressSession = require("express-session");
const passport = require("passport");

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost/node2fa";
const PORT = process.env.PORT || 5000;

// Configure app
app.set("view engine", "ejs");

// middlewares
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

// Configure passport
app.use((expressSession)({
    secret: "a4f8542071f-c33873-443447-8ee2321",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// configure mongoose and DB connection
mongoose.Promise = global.Promise;
mongoose.connect(DATABASE_URL, { reconnectTries: Number.MAX_VALUE }).then((db =>{
    // boot
    app.listen(PORT, ()=>{
        console.log("listenning on " + PORT);
    });
})).catch(dbErr =>{
    console.log("Connection Error : ", dbErr.message);
    process.exit(1);
});

app.use(routes);
app.use(ajax);
app.use(tfa);
