module.exports = function(sequelize, DataTypes) {
  const List = sequelize.define("list", {
    onList: DataTypes.BOOLEAN,
    inCart: DataTypes.BOOLEAN,
    inPantry: DataTypes.BOOLEAN,
    inactive: DataTypes.BOOLEAN,
    unavailable: DataTypes.BOOLEAN
  });

  List.associate = models => {
    List.belongsTo(models.item, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  List.associate = models => {
    List.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return List;
};
