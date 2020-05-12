'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    source: DataTypes.INTEGER,
    destination: DataTypes.INTEGER,
    event: DataTypes.STRING,
    party: DataTypes.INTEGER,
    state: DataTypes.BOOLEAN
  }, {});
  Notification.associate = function(models) {
    // associations can be defined here
  };
  return Notification;
};