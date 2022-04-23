// SET EXPRESS ENVIRONMENT
const express = require("express");
// const cors = require("cors");
const app = express();
const path = require("path");
const logger = require("./winston.js");
const passport = require("./passport.js");
const session = require("express-session");

// app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// fix CORS issue
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000/"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// SERVE UP STATIC FILES
app.use(express.static("public"));

//  START USING PUG
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// ADD WINSTON LOGGER MIDDLEWARE TO SERVER
app.use(logger);

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// SET UP THE ROUTERS
require("../routes/apiRoutes")(app);
require("../routes/htmlRoutes")(app);

module.exports = app;
