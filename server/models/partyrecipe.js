"use strict";
module.exports = (sequelize, DataTypes) => {
  const PartyRecipe = sequelize.define('PartyRecipe', {
    partyId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER
  }, {});
  PartyRecipe.associate = function(models) {
    PartyRecipe.belongsTo(models.Party);
    PartyRecipe.belongsTo(models.Recipe);
  };
  return PartyRecipe;
};
