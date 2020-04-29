'use strict';
module.exports = (sequelize, DataTypes) => {
  const Serata = sequelize.define('Serata', {
    beers: DataTypes.JSONB,
    cocktails: DataTypes.JSONB
  }, {});
  Serata.associate = function(models) {
    // associations can be defined here
  };
  return Serata;
};