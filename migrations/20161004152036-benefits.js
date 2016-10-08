'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('benefits', {
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
        benefit: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE  
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('benefits');
  }
};
