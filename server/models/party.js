"use strict";
module.exports = (sequelize, DataTypes) => {
  const Party = sequelize.define('Party', {
    recipes: DataTypes.JSONB,
    wines: DataTypes.JSONB,
    beers: DataTypes.JSONB,
    cocktails: DataTypes.JSONB,

  }, {});
  Party.associate = function(models) {
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
  Party.prototype.newComment = async function (user, comment) {
    return await UserComment.create({ userId: user, CommentId: comment }); // combina build e save( che la carica nel db)
  }


  Party.prototype.deleteComment = async function (user, comment) {
    let tuple = this.findAll({
      where: {
        userId: user,
        commentId: comment
      }
    });
    return await tuple.destroy();
  }
  return Party;
};
