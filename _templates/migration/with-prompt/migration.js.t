---
to: server/database/migrations/<%= nowPreffix %>-<%= migrationNameWithHyphen %>.js
---
'use strict';

const tableName = '<%= name %>';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const transaction = await queryInterface.sequelize.transaction();
    try {
      // alters
      // await queryInterface.addColumn(tableName, 'name', Sequelize.STRING, {
      //    after: 'columnB',
      //    transaction: transaction,
      // });
      // await queryInterface.renameColumn(tableName, 'nameBefore', 'nameAfter');
      // indexes
      // await queryInterface.addIndex(tableName, ['name'], {
      //  name: `${tableName}_name_idx`,
      //  transaction: transaction,
      // });
      // constraints
      // await queryInterface.addConstraint(tableName, ['email'], {
      //  type: 'unique',
      //  name: `${tableName}_email_ct`,
      //  transaction: transaction,
      // });
      // await transaction.commit();
    } catch (err) {
      // await transaction.rollback();
      throw err;
    }
  },
  down: async (queryInterface, Sequelize) => {
    // const transaction = await queryInterface.sequelize.transaction();
    try {
      // alters
      // await queryInterface.removeColumn(tableName, 'name');
      // await queryInterface.renameColumn(tableName, 'nameAfter', 'nameBefore');
      // indexes
      // await queryInterface.removeIndex(tableName, `${tableName}_name_idx`);
      // constraints
      // await queryInterface.removeConstraint(tableName, `${tableName}_email_ct`);
      // await transaction.commit();
    } catch (err) {
      // await transaction.rollback();
      throw err;
    }
  }
};
