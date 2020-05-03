"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User",
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
  //class method
  User.addHook('beforeCreate', (user, options) => {
    const salt= bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password,salt);
  });
  //instance Methods
  User.prototype.authenticate = function(password){
    return bcrypt.compareSync(password, this.password);
  }
  User.prototype.stringa = function(){
    return this.firstName;
  }
  return User;
};
