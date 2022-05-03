
module.exports = function (sequelize, DataTypes) {
  const Item = sequelize.define("item", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    category: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
      },
    },
  });
  // original association
  // Item.associate = (models) => {
  //   Item.hasMany(models.list, {
  //     onDelete: "cascade",
  //   });
  // };

  Item.associate = (models) => {
    Item.belongsTo(models.user);
  };

  return Item;
};
