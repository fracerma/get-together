"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserParty = sequelize.define("UserParty", {}, {});
  UserParty.associate = function (models) {
    // associations can be defined here
    UserParty.belongsTo(models.User, { foreignKey: "userId" });
    UserParty.belongsTo(models.Party, { foreignKey: "partyId" });
  };
  return UserParty;
};
