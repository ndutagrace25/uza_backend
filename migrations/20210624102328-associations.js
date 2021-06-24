'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Users","business_id",{
      type: Sequelize.INTEGER,
      references:{
        model: 'Businesses',
        key: "id"
      },
      onDelete: "SET NULL"
    })
    await queryInterface.changeColumn("Products","business_id",{
      type: Sequelize.INTEGER,
      references:{
        model: "Businesses",
        key: "id"
      },
      onDelete: "SET NULL"
    })
    await queryInterface.changeColumn("Products","category_id",{
      type: Sequelize.INTEGER,
      references:{
        model: "Categories",
        key: "id"
      },
      onDelete: "SET NULL"
    })
    await queryInterface.changeColumn("Requests","product_id",{
      type: Sequelize.INTEGER,
      references:{
        model: "Products",
        key: "id"
      },
      onDelete: "SET NULL"
    })
    /**
     * Add altering commands here.
     *   await queryInterface.changeColumn("Scores","userId",{
      type: Sequelize.INTEGER,
      references:{
        model: "Users",
        key: "id"
      },
      OnDelete: "SET NULL"
    })
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
