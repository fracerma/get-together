"use strict";
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      idfb: DataTypes.STRING,
      accessToken: DataTypes.STRING
    },
    {}
  );
  User.associate = function (models) {
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
    User.hasMany(models.Comment);
    User.hasMany(models.Recipe,{foreignKey:"userId"});
  };

  //class method
  User.addHook("beforeCreate", (user, options) => {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
  });

  //instance Methods
  User.prototype.authenticate = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  User.prototype.stringa = function () {
    return this.firstName;
  };
  return User;
};
