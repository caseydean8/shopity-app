// const { INTEGER } = require("sequelize/types");
// const { DataTypes } = require("sequelize");

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
    },
  });
  // original association
  Item.associate = models => {
    Item.hasMany(models.list, {
      onDelete: "cascade"
    });
  };

  // 3rd attempt
  Item.associate = (models) => {
    Item.belongsTo(models.user);
  };

  // 2nd attempt
  // Item.associate = function ({ User }) {
  //   this.belongsTo(User);
  // };

  // first attempt
  // Item.associate = function ({ User }) {
  //   this.belongsTo(User, {
  //     foreignKey: "userId",
  //     as: "user",
  //   });
  // };

  return Item;
};
