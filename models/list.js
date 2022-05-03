module.exports = function(sequelize, DataTypes) {
  const List = sequelize.define("list", {
    onList: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    inCart: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    inactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });

  // List.associate = models => {
  //   List.belongsTo(models.item, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  //   List.belongsTo(models.user, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return List;
};
