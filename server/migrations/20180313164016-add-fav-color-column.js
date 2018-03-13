'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('Users', 'fav_color', Sequelize.STRING)
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropColumn('Users', 'fav_color');
  }
};
