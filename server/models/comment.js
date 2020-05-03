"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      text: DataTypes.TEXT,
    },
    {}
  );
  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsToMany(models.Party, {
      through: "CommentParty",
      foreignKey: "commentId",
    });
    Comment.belongsTo(models.User, {
      through: "UserComment",
      foreignKey: "commentId",
    });
  };
  return Comment;
};
