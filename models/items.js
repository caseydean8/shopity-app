module.exports = function(sequelize, DataTypes) {
  const Item = sequelize.define("item", {
    name: DataTypes.STRING,
    category: DataTypes.STRING
  });
  return Item;
};
