"use strict";
module.exports = (sequelize, DataTypes) => {
  const Favourite = sequelize.define('Favourite', {
    UserId: DataTypes.INTEGER,
    RecipeId: DataTypes.INTEGER
  }, {});
  Favourite.associate = function(models) {
    Favourite.belongsTo(models.User);
    Favourite.belongsTo(models.Recipe);
  };
  return Favourite;
};
