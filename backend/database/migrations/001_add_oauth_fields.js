'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'auth_provider', {
      type: Sequelize.ENUM('email', 'google', 'apple'),
      defaultValue: 'email',
      allowNull: false,
    });

    await queryInterface.addColumn('users', 'google_id', {
      type: Sequelize.STRING(255),
      allowNull: true,
      unique: true,
    });

    await queryInterface.addColumn('users', 'apple_id', {
      type: Sequelize.STRING(255),
      allowNull: true,
      unique: true,
    });

    // Make password_hash optional for OAuth users
    await queryInterface.changeColumn('users', 'password_hash', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });

    // Add indexes for OAuth IDs
    await queryInterface.addIndex('users', ['google_id'], {
      unique: true,
      where: {
        google_id: {
          [Sequelize.Op.ne]: null
        }
      }
    });

    await queryInterface.addIndex('users', ['apple_id'], {
      unique: true,
      where: {
        apple_id: {
          [Sequelize.Op.ne]: null
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove indexes
    await queryInterface.removeIndex('users', ['google_id']);
    await queryInterface.removeIndex('users', ['apple_id']);

    // Remove columns
    await queryInterface.removeColumn('users', 'auth_provider');
    await queryInterface.removeColumn('users', 'google_id');
    await queryInterface.removeColumn('users', 'apple_id');

    // Make password_hash required again
    await queryInterface.changeColumn('users', 'password_hash', {
      type: Sequelize.STRING(255),
      allowNull: false,
    });

    // Remove ENUM type
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_users_auth_provider;');
  }
};
