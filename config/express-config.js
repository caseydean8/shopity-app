// SET EXPRESS ENVIRONMENT
var express = require('express')
var app = express()

// var logger = require('./winston.js');
// var winston = require('winston'); // for transports.Console

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// SERVE UP STATIC FILES
app.use(express.static("public"));

//  SET UP HANDLEBARS
var expHandlebars = require('express-handlebars')
app.engine("handlebars", expHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ADD IN WINSTON AS MIDDLEWARE LOGGER
// app.use(logger);

// SET UP THE ROUTERS
require("../routes/apiRoutes")(app);
require("../routes/htmlRoutes")(app);

module.exports = app;