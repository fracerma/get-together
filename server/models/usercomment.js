"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserComment = sequelize.define(
    "UserComment",
    {
      userId: DataTypes.INTEGER,
      commentId: DataTypes.INTEGER,
    },
    {}
  );
  UserComment.associate = function (models) {
    // associations can be defined here
    UserComment.belongsTo(models.User);
    UserComment.belongsTo(models.Comment);
  };

  return UserComment;
};




