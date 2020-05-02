'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CommentParties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      commentId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Comments',
            key: 'id'
          }
      },
      partyId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Parties',
            key: 'id'
          }
      },
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
    return queryInterface.dropTable('CommentParties');
  }
};