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
    Comment.belongsTo(models.Party, { foreignKey: "partyId" });
    Comment.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Comment;
};
