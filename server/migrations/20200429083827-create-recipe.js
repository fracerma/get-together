'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      image:{ type: Sequelize.STRING},
      readyInMinutes:{ type: Sequelize.INTEGER},
      servings:{ type: Sequelize.INTEGER},
      sourceUrl:{ type: Sequelize.STRING},
      dishTypes:{ type: Sequelize.JSONB} ,//arary json
      cuisines:{ type: Sequelize.JSONB} ,//array json
      diets:{ type: Sequelize.JSONB},//array json
      extendedIngredients:{ type: Sequelize.JSONB},//array di json
      leng:{ type: Sequelize.STRING},
      type:{ type: Sequelize.STRING},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Recipe');
  }
};