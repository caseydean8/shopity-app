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
  app.post("/login", (req, res) => {
    let theUsername = req.body.username;
    let thePassword = req.body.password;
    db.user
      .findAll({
        where: { username: theUsername }
      })
      .then(users => {
        if (users.length === 0) {
          res.status("404").send({ response: "userNotFound" });
        } else {
          if (users[0].password === thePassword) {
            res.status("200").redirect("/user");
          } else {
            res.status("404").send({ response: "passwordNotMatch" });
          }
        }
      });
  });

  app.post("api/update-item", (req, res) => {
    let userId = req.body.userId;
    let itemId = req.body.itemId;
    let fieldToUpdate = req.body.field;
    let newValue = req.body.newValue;

    switch (fieldToUpdate) {
      case "onList":
        break;
      case "inCart":
        break;
      case "inPantry":
        break;
      case "inactive":
        break;
      case "unavailable":
        break;
      default:
        res.status(402).send("Something went wrong");
    }
  });
};
