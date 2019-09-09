const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = app => {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load example page and pass in an example by id
  app.get("/user", isAuthenticated, (req, res) => {
    db.list
      .findAll({
        where: {
          userId: req.user.id
        },
        include: [db.item]
      })
      .then(data => {
        // res.render("user", data);
        // just rendering the page at the moment, will udate to include data once the pug file is complete.
        console.lof(data);
        res.render("user");
        // res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.redirect("/");
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
