'use strict';
module.exports = (sequelize, DataTypes) => {
  const PartyRecipe = sequelize.define('PartyRecipe', {
    partyId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER
  }, {});
  PartyRecipe.associate = function(models) {
    // associations can be defined here
    partyId.belongsTo(models.Party);
    recipeId.belongsTo(models.Recipe);
  };
  return PartyRecipe;
};