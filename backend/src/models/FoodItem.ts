import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface FoodItemAttributes {
  id: string;
  userId: string;
  name: string;
  imageUrl?: string;
  aiAnalysis?: any;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  consumedAt: Date;
  createdAt: Date;
}

interface FoodItemCreationAttributes extends Optional<FoodItemAttributes, 'id' | 'createdAt'> {}

export default function FoodItem(sequelize: Sequelize) {
  class FoodItemModel extends Model<FoodItemAttributes, FoodItemCreationAttributes> implements FoodItemAttributes {
    public id!: string;
    public userId!: string;
    public name!: string;
    public imageUrl?: string;
    public aiAnalysis?: any;
    public calories?: number;
    public protein?: number;
    public carbs?: number;
    public fat?: number;
    public fiber?: number;
    public sugar?: number;
    public sodium?: number;
    public mealType!: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    public consumedAt!: Date;
    public readonly createdAt!: Date;

    static associate(models: any) {
      FoodItemModel.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE'
      });
    }
  }

  FoodItemModel.init(
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
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      aiAnalysis: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      calories: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      protein: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      carbs: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      fat: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      fiber: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      sugar: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      sodium: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      mealType: {
        type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snack'),
        allowNull: false,
      },
      consumedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'food_items',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          fields: ['user_id'],
        },
        {
          fields: ['meal_type'],
        },
        {
          fields: ['consumed_at'],
        },
        {
          fields: ['created_at'],
        },
      ],
    }
  );

  return FoodItemModel;
}
