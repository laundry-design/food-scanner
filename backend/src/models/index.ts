import { Sequelize } from 'sequelize';
import { config } from '../config/database';
import User from './User';
import RefreshToken from './RefreshToken';
import FoodItem from './FoodItem';
import DailyNutrition from './DailyNutrition';
import UserGoal from './UserGoal';
import NutritionEntry from './NutritionEntry';

const env = process.env['NODE_ENV'] || 'development';
const dbConfig = config[env as keyof typeof config];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Initialize models
const models = {
  User: User(sequelize),
  RefreshToken: RefreshToken(sequelize),
  FoodItem: FoodItem(sequelize),
  DailyNutrition: DailyNutrition(sequelize),
  UserGoal: UserGoal(sequelize),
  NutritionEntry: NutritionEntry(sequelize)
};

// Define associations
Object.values(models).forEach((model: any) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize, models };
export default sequelize;
