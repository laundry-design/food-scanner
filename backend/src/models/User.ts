import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  plan: string;
  age?: number;
  weight?: number;
  weightUnit: string;
  height?: number;
  heightUnit: string;
  gender?: string;
  fitnessGoal?: string;
  gymActivity?: string;
  dietFocus?: string;
  isOnboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export default function User(sequelize: Sequelize) {
  class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public name!: string;
    public email!: string;
    public passwordHash!: string;
    public plan!: string;
    public age?: number;
    public weight?: number;
    public weightUnit!: string;
    public height?: number;
    public heightUnit!: string;
    public gender?: string;
    public fitnessGoal?: string;
    public gymActivity?: string;
    public dietFocus?: string;
    public isOnboardingCompleted!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      UserModel.hasMany(models.RefreshToken, {
        foreignKey: 'userId',
        as: 'refreshTokens',
        onDelete: 'CASCADE'
      });
      
      UserModel.hasMany(models.FoodItem, {
        foreignKey: 'userId',
        as: 'foodItems',
        onDelete: 'CASCADE'
      });
      
      UserModel.hasMany(models.DailyNutrition, {
        foreignKey: 'userId',
        as: 'dailyNutrition',
        onDelete: 'CASCADE'
      });
      
      UserModel.hasMany(models.UserGoal, {
        foreignKey: 'userId',
        as: 'userGoals',
        onDelete: 'CASCADE'
      });
      
      UserModel.hasMany(models.NutritionEntry, {
        foreignKey: 'userId',
        as: 'nutritionEntries',
        onDelete: 'CASCADE'
      });
    }
  }

  UserModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      passwordHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      plan: {
        type: DataTypes.STRING(50),
        defaultValue: 'basic',
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 16,
          max: 100,
        },
      },
      weight: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      weightUnit: {
        type: DataTypes.STRING(2),
        defaultValue: 'KG',
        validate: {
          isIn: [['KG', 'LB']],
        },
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 100,
          max: 250,
        },
      },
      heightUnit: {
        type: DataTypes.STRING(2),
        defaultValue: 'CM',
        validate: {
          isIn: [['CM', 'IN']],
        },
      },
      gender: {
        type: DataTypes.STRING(10),
        allowNull: true,
        validate: {
          isIn: [['male', 'female', 'other']],
        },
      },
      fitnessGoal: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      gymActivity: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      dietFocus: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      isOnboardingCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['email'],
        },
      ],
    }
  );

  return UserModel;
}
