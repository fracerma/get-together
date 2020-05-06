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


UserComment.newComment = function(user, comment){
  return await UserComment.create({ userId: user, CommentId:  comment});
}
await UserComment.create({ userId: user, CommentId:  comment}); // combina build e save( che la carica nel db)

UserComment.deleteComment =  function(user, comment){
  let tuple = this.findAll({
    where: {
      userId: user,
      commentId: comment 
    }
  });
  return await tuple.destroy();
}

