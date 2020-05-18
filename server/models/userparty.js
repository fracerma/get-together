"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserParty = sequelize.define(
    "UserParty",
    {
      UserId: DataTypes.INTEGER,
      PartyId: DataTypes.INTEGER,
    },
    {}
  );
  UserParty.associate = function (models) {
    // associations can be defined here
    UserParty.belongsTo(models.User);
    UserParty.belongsTo(models.Party);
  };
  this.newInvitation = async function (user, party) {
    return await this.create({ UserId: user, PartyId: party }); // combina build e save( che la carica nel db)
  }


  this.refuse = async function (user, party) {
    let tuple = this.findAll({
      where: {
        UserId: user,
        PartyId: party
      }
    });
    return await tuple.destroy();
  }
  return UserParty;
};


