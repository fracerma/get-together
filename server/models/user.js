'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    //TODO associazioni
    User.belongsTo(User,{as: "friends", through: "Friendships", foreignKey:"userId"});
  };
  return User;
};