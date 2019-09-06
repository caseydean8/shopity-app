const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = app => {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load example page and pass in an example by id
  app.get("/user", isAuthenticated, (req, res) => {
    // res.render("user-home");
    res.send("Render user page for " + req.user.username + " here.");
  });

  // Load example page and pass in an example by id
  app.get("/list", isAuthenticated, (req, res) => {
    res.send("list");
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.send("404");
  });
};
