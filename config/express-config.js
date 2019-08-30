// SET EXPRESS ENVIRONMENT
const express = require("express");
const app = express();

const logger = require("./winston.js");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// SERVE UP STATIC FILES
app.use(express.static("public"));

//  SET UP HANDLEBARS
const expHandlebars = require("express-handlebars");
app.engine("handlebars", expHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ADD WINSTON LOGGER MIDDLEWARE TO SERVER
app.use(logger);

// SET UP THE ROUTERS
require("../routes/apiRoutes")(app);
require("../routes/htmlRoutes")(app);

module.exports = app;
