'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: DataTypes.TEXT
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    //TODO associazioni commento
    
  };
  return Comment;
};