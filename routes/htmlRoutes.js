const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = (app) => {
  // Load index page
  app.get("/", function (req, res) {
    let data = {};
    if (req.user) {
      console.log("User is defined");
      data.authUser = true;
    } else {
      console.log("User is undefined");
      data.authUser = false;
    }
    res.render("index", data);
  });

  // Load example page and pass in an example by id
  // loads user and list and items, sends data to pug file
  app.get("/user", isAuthenticated, (req, res) => {
    let data = {};
    data.user = {};
    data.user.firstName = req.user.firstName;
    data.user.lastName = req.user.lastName;
    data.user.username = req.user.username;
    data.user.id = req.user.id;
    // console.log(data);

    db.item
      .findAll({
        where: {
          userId: req.user.id,
        },
      })
      .then((items) => {
        console.log(`item find all /user htmlRoutes`);
        str = JSON.stringify(items, null, 4);
        // console.log(str);
        data.items = items;
        console.log(`data after items table find`);
        dataStr = JSON.stringify(data, null, 4);
        console.log(dataStr);
        res.render("user", data);
      })
      .catch((err) => {
        console.log(err);
      });

    // db.list
    //   .findAll({
    //     where: {
    //       userId: req.user.id,
    //     },
    //     include: [db.item],
    //   })
    //   .then((userList) => {
    //     data.userList = userList;
    //     db.item.findAll({}).then((items) => {
    //       data.items = items;
    //       // just rendering the page at the moment, will udate to include data once the pug file is complete.
    //       console.log(`data in /user get route with list`);
    //       console.log(data);
    //       res.render("user", data);
    //       // res.json(data);
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // res.redirect("/");
    //   });
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
