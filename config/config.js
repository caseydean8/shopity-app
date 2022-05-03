require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "shopping_list_db",
    host: "localhost",
    dialect: "mysql",
  },
  test: {
    username: "fnhxlygp36haoa6c",
    password: process.env.JAWSDB_PASSWORD,
    database: "m1813t8yzk3cpl2u",
    host: "dcrhg4kh56j13bnu.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
  },
  production: {
    username: "fnhxlygp36haoa6c",
    password: process.env.JAWSDB_PASSWORD,
    database: "m1813t8yzk3cpl2u",
    host: "dcrhg4kh56j13bnu.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
    use_env_variable: "JAWSDB_MARIA_URL",
  },
};
