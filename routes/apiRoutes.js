const passport = require("../config/passport.js");
const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = app => {
  app.post("/api/userlist", (req, res) => {
    db.list
      .findAll({
        where: { id: req.body.userId }
      })
      .then(userList => {
        res.json(userList);
      });
  });

  // CREATE A NEW USER, then log them in and redirect them to the user-home page.
  app.post("/api/adduser", (req, res) => {
    db.user
      .create(req.body)
      .then(newUser => {
        res.json(newUser);
      })
      .then(() => {
        res.redirect(307, "/login");
      })
      .catch(err => {
        res.status(401), json(err);
      });
  });

  // CREATE A NEW ITEM
  app.post("/api/newitem", isAuthenticated, (req, res) => {
    db.item.create(req.body).then(newItem => {
      res.json(newItem);
    });
  });

  //LOGIN ROUTE - redirects to the user homepage HTML ROUTE if successful
  app.post("/login", passport.authenticate("local"), (req, res) => {
    res.redirect("/user");
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.post("/api/update", isAuthenticated, (req, res) => {
    let newItem = {};
    newItem.userId = req.user.id;
    newItem.itemId = req.body.itemId;
    newItem.onList = req.body.onList;
    newItem.inCart = req.body.inCart;

    console.log(newItem);

    // check if the id/item pair exists
    db.list
      .findOne({
        where: {
          userId: newItem.userId,
          itemId: newItem.itemId
        }
      })
      .then(theItem => {
        if (theItem) {
          res.json(theItem);
        } else {
          console.log("Item does not exist yet");
          db.list.create(newItem).then(response => {
            res.json(response);
          });
        }
      });
  });
};
