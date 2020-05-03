"use strict";
module.exports = (sequelize, DataTypes) => {
  const Favourite = sequelize.define(
    "Favourite",
    {
      userId: DataTypes.INTEGER,
      recipeId: DataTypes.INTEGER,
    },
    {}
  );
  Favourite.associate = function (models) {
    // associations can be defined here
    Favourite.belongsTo(models.User);
    Favourite.belongsTo(models.Recipe);
  };
  return Favourite;
};
