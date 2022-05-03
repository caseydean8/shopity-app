const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = (app) => {
  // Load index page
  app.get("/", function (req, res) {
    let data = {};
    if (req.user) {
      data.authUser = true;
    } else {
      data.authUser = false;
    }
    res.render("index", data);
  });

  // loads user and list and items, sends data to pug file
  app.get("/user", isAuthenticated, (req, res) => {
    let data = {};
    data.user = {};
    data.user.firstName = req.user.firstName;

    db.item
      .findAll({
        where: {
          userId: req.user.id,
        },
      })
      .then((items) => {
        // add array of items to data object to send to pug
        data.items = items;
        res.render("user", data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.get("/usertest", (req, res) => {
    res.render("user");
  });

  app.get("/contact", (req, res) => {
    res.render("contact");
  });
  // Load example page and pass in an example by id
  app.get("/list", isAuthenticated, (req, res) => {
    res.send("list");
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
