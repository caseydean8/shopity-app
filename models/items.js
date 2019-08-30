module.exports = function(sequelize, DataTypes) {
  const Item = sequelize.define("item", {
    name: DataTypes.STRING,
    category: DataTypes.STRING
  });

  Item.associate = models => {
    Item.hasMany(models.list, {
      onDelete: "cascade"
    });
  };

  return Item;
};
