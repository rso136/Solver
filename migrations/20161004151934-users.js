'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('users', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        score: {
          type: Sequelize.INTEGER,
          defaultValue: 0 
        },
        total: {
          type: Sequelize.INTEGER,
          defaultValue: 0 
        },
        grade: {
          type: Sequelize.STRING,
          defaultValue: 'E'
        },   
        random: Sequelize.STRING, 
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('users');
  }
};
