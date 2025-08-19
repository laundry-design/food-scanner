import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface DailyNutritionAttributes {
  id: string;
  userId: string;
  date: Date;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
  totalSugar: number;
  totalSodium: number;
  createdAt: Date;
  updatedAt: Date;
}

interface DailyNutritionCreationAttributes extends Optional<DailyNutritionAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export default function DailyNutrition(sequelize: Sequelize) {
  class DailyNutritionModel extends Model<DailyNutritionAttributes, DailyNutritionCreationAttributes> implements DailyNutritionAttributes {
    public id!: string;
    public userId!: string;
    public date!: Date;
    public totalCalories!: number;
    public totalProtein!: number;
    public totalCarbs!: number;
    public totalFat!: number;
    public totalFiber!: number;
    public totalSugar!: number;
    public totalSodium!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      DailyNutritionModel.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE'
      });
    }
  }

  DailyNutritionModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      totalCalories: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      totalProtein: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      totalCarbs: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      totalFat: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      totalFiber: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      totalSugar: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      totalSodium: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0,
        validate: {
          min: 0,
        },
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
      tableName: 'daily_nutrition',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['user_id', 'date'],
        },
        {
          fields: ['user_id'],
        },
        {
          fields: ['date'],
        },
      ],
    }
  );

  return DailyNutritionModel;
}
