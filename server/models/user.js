"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
    //TODO associazioni
    User.belongsToMany(User, {
      as: "friends",
      through: "Friendships",
      foreignKey: "userId",
    });
    User.belongsToMany(models.Recipe, {
      as: "favourites",
      through: "Favourites",
      foreignKey: "userId",
    });
    User.belongsToMany(models.Party, {
      through: "UserParty",
      foreignKey: "userId",
    });
    User.belongsToMany(models.Comment, {
      through: "UserComment",
      foreignKey: "userId",
    });
  };
  return User;
};
