'use strict';

const tableName = 'or_order_product';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        tableName,
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          orderId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'or_order',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          glProductId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'gl_product',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          glUnitId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'gl_unit',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          quantity: {
            type: Sequelize.DECIMAL(16, 3),
            allowNull: false,
          },
          notes: {
            type: Sequelize.TEXT('medium'),
          },
        },
        {
          transaction: transaction,
        }
      );
      // indexes
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable(tableName, {
        transaction: transaction,
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
