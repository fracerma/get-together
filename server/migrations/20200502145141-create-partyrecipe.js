"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("PartyRecipes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      PartyId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Parties",
          key: "id",
        },
      },
      RecipeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Recipes",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("PartyRecipes");
  },
};
