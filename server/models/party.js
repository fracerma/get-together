"use strict";
module.exports = (sequelize, DataTypes) => {
  const Party = sequelize.define(
    "Party",
    {
      owner: DataTypes.INTEGER,
      name: DataTypes.STRING,
      wines: DataTypes.JSONB,
      beers: DataTypes.JSONB,
      cocktails: DataTypes.JSONB,
    },
    {}
  );
  Party.associate = function (models) {
    Party.hasMany(models.Comment, { foreignKey: "PartyId" });
    //Party.belongsTo(models.User, { foreingKey: "owner" });
    Party.belongsToMany(models.Recipe, {
      through: "PartyRecipe",
      foreingKey: "PartyId",
    });
    Party.belongsToMany(models.User, {
      through: "UserParty",
      foreingKey: "PartyId",
    });
  };
  return Party;
};
