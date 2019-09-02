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
};
