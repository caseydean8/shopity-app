const passport = require("../config/passport.js");
const db = require("../models");

module.exports = function(app) {
  app.post("/api/userlist", function(req, res) {
    db.list
      .findAll({
        where: { id: req.body.userId }
      })
      .then(userList => {
        res.json(userList);
      });
  });

  // CREATE A NEW USER
  app.post("/api/adduser", function(req, res) {
    db.user.create(req.body).then(newUser => {
      res.json(newUser);
    });
  });

  // CREATE A NEW ITEM
  app.post("/api/newitem", function(req, res) {
    db.item.create(req.body).then(newItem => {
      res.json(newItem);
    });
  });

  //LOGIN ROUTE - redirects to the user homepage HTML ROUTE if successful
  app.post("/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // app.post("api/update-item", (req, res) => {
  // let userId = req.body.userId;
  // let itemId = req.body.itemId;
  // let fieldToUpdate = req.body.field;
  // let newValue = req.body.newValue;

  // // check if the id/item pair exists
  // // if it exists set a variable to tell us

  // switch (fieldToUpdate) {
  //   case "onList":
  //     // if pair exists update it, otherwise create it.
  //     break;
  //   case "inCart":
  //             // if pair exists update it, otherwise create it.

  //     break;
  //   case "inPantry":
  //             // if pair exists update it, otherwise create it.

  //     break;
  //   case "inactive":
  //             // if pair exists update it, otherwise create it.

  //     break;
  //   case "unavailable":
  //             // if pair exists update it, otherwise create it.

  //     break;
  //   default:
  //     res.status(401).send("Something went wrong");
  // }
  // });
};
