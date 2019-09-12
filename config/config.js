require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "shopping_list_db",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "shopping_list_db",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false
  },
  production: {
    username: "root",
    password: null,
    database: "test_db",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false
  }
};
