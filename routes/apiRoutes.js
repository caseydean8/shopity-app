const passport = require("../config/passport.js");
const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const user = require("../models/user.js");
// const { it } = require("mocha");

module.exports = (app) => {
  // this route finds all list items for the authenticated user, and returns them as a JSON object
  // app.get("/api/userlist", isAuthenticated, (req, res) => {
  //   let data = {};
  //   data.user = {};
  //   data.user.firstName = req.user.firstName;
  //   data.user.lastName = req.user.lastName;
  //   data.user.username = req.user.username;

  //   db.list
  //     .findAll({
  //       where: {
  //         userId: req.user.id,
  //       },
  //       include: [db.item],
  //     })
  //     .then((userList) => {
  //       data.userList = userList;
  //       db.item.findAll({}).then((items) => {
  //         data.items = items;
  //         res.json(data);
  //       });
  //     });
  // });

  // CREATE A NEW USER, then log them in and redirect them to the user-home page.
  app.post("/api/adduser", (req, res) => {
    // check to make sure the username is not a duplicate
    db.user
      .findOne({ where: { username: req.body.username } })
      .then((response) => {
        if (response) {
          res.json({ status: "Username already exists." });
        } else {
          db.user
            // create a new user in the users table
            .create(req.body)
            .then(() => {
              // redirect the new user to the login route
              res.json(req.body);
            })
            .catch((err) => {
              res.json(err);
            });
        }
      });
  });

  // CREATE A NEW ITEM
  app.post("/api/newitem", isAuthenticated, (req, res) => {
    // use the req.body object to create a new entry in the items table
    db.item.findOne({ where: { name: req.body.name } }).then((response) => {
      if (response) {
        res.json({ status: "duplicate" });
      } else {
        const itemCategory = -1;
        db.item
          .create({
            name: req.body.name,
            category: itemCategory,
            userId: req.user.id,
          })
          .then(() => {
            res.redirect("/user");
          });
      }
    });
  });
  //LOGIN ROUTE - redirects to the user homepage HTML ROUTE if successful
  app.post("/login", function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json(info);
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ status: "success" });
      });
    })(req, res, next);
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    // use passport to log the user out of their session
    req.logout();
    // redirect the browse to the home route with no user object
    res.redirect("/");
  });

  app.post("/api/update", isAuthenticated, (req, res) => {
    // pull together an obect to send to ther database that mirrors the lists
    const { itemId, category } = req.body;
    db.item
      .update(
        {
          category: category,
        },
        {
          where: { id: itemId },
        }
      )
      .then((updated) => {
        console.log(updated)
        res.json(updated);
      });
  });
};
