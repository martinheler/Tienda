module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('orders', 'product_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'products', // ✅ Ensure 'products' is the correct table name
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('orders', 'product_id');
  },
};
