const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = app => {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load example page and pass in an example by id
  app.get("/user", isAuthenticated, (req, res) => {
    // res.render("user-home");
    db.list
      .findAll({
        where: {
          userId: req.user.id
        }
      })
      .then(data => {
        // res.render ("user", data)
        // simply returning the user's list as JSON for now, until the user page it built.
        res.json(data);
      });
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
