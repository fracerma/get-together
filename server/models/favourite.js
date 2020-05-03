'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favourite = sequelize.define('Favourite', {
    userId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER
  }, {});
  Favourite.associate = function(models) {
    Favourite.belongsTo(models.User);
    Favourite.belongsTo(models.Recipe);
  };
  return Favourite;
};