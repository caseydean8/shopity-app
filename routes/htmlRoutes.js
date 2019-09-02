// const db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load example page and pass in an example by id
  app.get("/user", function(req, res) {
    res.render("user-home");
  });

  // Load example page and pass in an example by id
  app.get("/list", function(req, res) {
    res.send("list");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.send("404");
  });
};
