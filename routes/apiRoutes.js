const db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/userlist", function(req, res) {
    db.list
      .findAll({
        where: { id: req.params.userId }
      })
      .then(userList => {
        res.json(userList);
      });
  });

  // Create a new example
  app.post("/api/adduser", function(req, res) {
    db.user.create(req.body).then(newUser => {
      res.json(newUser);
    });
  });

  // Delete an example by id
  app.post("/api/newitem", function(req, res) {
    db.item.create(req.body).then(newItem => {
      res.json(newItem);
    });
  });

  app.post("/login", (req, res) => {
    let theUsername = req.body.username;
    let thePassword = req.body.password;
    db.user
      .findAll({
        where: { username: theUsername }
      })
      .then(users => {
        if (users.length === 0) {
          res.status("404").send({ user: notFound });
        } else {
          if (users[0].password === thePassword) {
            res.status("200").redirect("/user");
          } else {
            res.status("401").send({ password: noMatch });
          }
        }
      });
  });
};
