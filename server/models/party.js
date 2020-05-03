"use strict";
module.exports = (sequelize, DataTypes) => {
  const Party = sequelize.define(
    "Party",
    {
      recipes: DataTypes.JSONB,
      wines: DataTypes.JSONB,
      beers: DataTypes.JSONB,
      cocktails: DataTypes.JSONB,
    },
    {}
  );
  Party.associate = function (models) {
    // associations can be defined here
    //TODO associazioni
    Party.belongsToMany(models.Comment, {
      through: "CommentParty",
      foreingKey: "partyId",
    });
    Party.belongsToMany(models.Recipe, {
      through: "PartyRecipe",
      foreingKey: "partyId",
    });
    Party.belongsToMany(models.User, {
      through: "UserParty",
      foreingKey: "partyId",
    });
  };
  return Party;
};
