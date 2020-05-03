"use strict";
module.exports = (sequelize, DataTypes) => {
  const PartyRecipe = sequelize.define(
    "PartyRecipe",
    {
      partyId: DataTypes.INTEGER,
      recipeId: DataTypes.INTEGER,
    },
    {}
  );
  PartyRecipe.associate = function (models) {
    // associations can be defined here
    PartyRecipe.belongsTo(models.Party);
    PartyRecipe.belongsTo(models.Recipe);
  };
  return PartyRecipe;
};
