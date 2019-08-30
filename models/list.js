module.exports = function(sequelize, DataTypes) {
  const List = sequelize.define("list", {
    onList: DataTypes.BOOLEAN,
    inCart: DataTypes.BOOLEAN,
    inPantry: DataTypes.BOOLEAN,
    inactive: DataTypes.BOOLEAN,
    unavailable: DataTypes.BOOLEAN
  });
  return List;
};
