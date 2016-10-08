'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
  return queryInterface
      .createTable('detriments', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true     
        },
        option_id: {
          type: Sequelize.INTEGER
        },
        weight: {
          type: Sequelize.INTEGER
        },
        detriment: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE  
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('detriments');
  }
};
