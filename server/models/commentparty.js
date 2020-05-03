'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommentParty = sequelize.define('CommentParty', {
    commentId: DataTypes.INTEGER,
    partyId: DataTypes.INTEGER
  }, {});
  CommentParty.associate = function(models) {
    // associations can be defined here
    CommentParty.belongsTo(models.Comment);
    CommentParty.belongsTo(models.Party);
  };
  return CommentParty;
};