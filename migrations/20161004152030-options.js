'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('options', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true 
        },
        problem_id: {
          type: Sequelize.INTEGER
        },
        option: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('options');
  }
};
