"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserParty = sequelize.define(
    "UserParty",
    {
      userId: DataTypes.INTEGER,
      partyId: DataTypes.INTEGER,
    },
    {}
  );
  UserParty.associate = function (models) {
    // associations can be defined here
    UserParty.belongsTo(models.User);
    UserParty.belongsTo(models.Party);
  };
  return UserParty;
};
