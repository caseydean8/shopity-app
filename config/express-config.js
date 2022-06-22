// SET EXPRESS ENVIRONMENT
const express = require("express");
const app = express();
const path = require("path");
const logger = require("./winston.js");
const passport = require("./passport.js");
const session = require("express-session");
const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// SERVE UP STATIC FILES
app.use(express.static("public"));

//  START USING PUG
app.set("view engine", "pug");
app.set("../views", path.join(__dirname, "views"));

// ADD WINSTON LOGGER MIDDLEWARE TO SERVER
app.use(logger);

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// SET UP CONTACT PAGE EMAIL
app.use(cors());
const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "caseydean8@gmail.com",
    pass: process.env.GMPASS,
  },
});
contactEmail.verify((error) => {
  error ? console.log(error) : console.log(`ready to send`);
});

// SET UP THE ROUTERS
require("../routes/apiRoutes")(app);
require("../routes/htmlRoutes")(app);

module.exports = app;
