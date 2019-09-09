module.exports = function(sequelize, DataTypes) {
  const Item = sequelize.define("item", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Item.associate = models => {
    Item.hasMany(models.list, {
      onDelete: "cascade"
    });
  };

  return Item;
};
