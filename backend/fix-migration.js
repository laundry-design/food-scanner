const { Sequelize } = require('sequelize');
require('dotenv').config();

async function fixMigration() {
  const sequelize = new Sequelize({
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'foodscanner_dev',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  });

  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Mark the OAuth migration as completed
    await sequelize.query(
      "INSERT INTO \"SequelizeMeta\" (name) VALUES ('001_add_oauth_fields.js') ON CONFLICT (name) DO NOTHING"
    );

    console.log('Migration marked as completed successfully.');
    
    // Check migration status
    const [results] = await sequelize.query('SELECT name FROM "SequelizeMeta" ORDER BY name');
    console.log('Current migrations:', results.map(r => r.name));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

fixMigration();
