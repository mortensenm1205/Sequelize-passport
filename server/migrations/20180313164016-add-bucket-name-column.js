'use strict';
//Trying to use just a migration file to edit my schema.
module.exports = {
  up: (queryInterface, Sequelize) => {
    //I'm just adding a simple column called fav_color
    return queryInterface.addColumn('Users', 'bucketName', Sequelize.STRING)
  },

  down: (queryInterface, Sequelize) => {
    //Also wrote a down funciton to remove the fav_color column
    return queryInterface.dropColumn('Users', 'bucketName');
  }
};
