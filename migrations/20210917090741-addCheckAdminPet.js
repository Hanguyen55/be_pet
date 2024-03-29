"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("pets", "status", {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("pets", "status")]);
  },
};
