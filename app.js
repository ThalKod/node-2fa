const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const routes  = require("./routes/index");
const passportInit = require("./config/passport");

// Configure app
app.set("view engine", "ejs");

// middlewares
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

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
passportInit(app);

app.use(routes);






