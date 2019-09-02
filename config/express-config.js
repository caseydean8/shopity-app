// SET EXPRESS ENVIRONMENT
const express = require("express");
const app = express();
const path = require("path");
const logger = require("./winston.js");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// SERVE UP STATIC FILES
app.use(express.static("public"));

//  START USING PUG
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// ADD WINSTON LOGGER MIDDLEWARE TO SERVER
app.use(logger);

// SET UP THE ROUTERS
require("../routes/apiRoutes")(app);
require("../routes/htmlRoutes")(app);

module.exports = app;
