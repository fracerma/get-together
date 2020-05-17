"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserParty = sequelize.define("UserParty", {}, {});
  UserParty.associate = function (models) {
    // associations can be defined here
    UserParty.belongsTo(models.User);
    UserParty.belongsTo(models.Party);
  };
  this.newInvitation = async function (user, party) {
    return await this.create({ userId: user, partyId: party }); // combina build e save( che la carica nel db)
  };

  this.refuse = async function (user, party) {
    let tuple = this.findAll({
      where: {
        userId: user,
        partyId: party,
      },
    });
    return await tuple.destroy();
  };
  return UserParty;
};
