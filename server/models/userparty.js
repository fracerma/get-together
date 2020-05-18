"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserParty = sequelize.define(
    "UserParty",
    {
      UserId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      PartyId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {},
    {}
  );
  UserParty.associate = function (models) {
    // associations can be defined here
    UserParty.belongsTo(models.User);
    UserParty.belongsTo(models.Party);
  };

  return UserParty;
};
