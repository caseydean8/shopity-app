module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("user", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  });
  return User;
};
