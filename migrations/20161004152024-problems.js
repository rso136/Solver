'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('problems', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        user_id: Sequelize.INTEGER,
        problem: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface 
      .dropTable('problems'); 
  }
};
