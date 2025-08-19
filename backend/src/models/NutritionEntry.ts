import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface NutritionEntryAttributes {
  id: string;
  userId: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  consumedAt: Date;
  createdAt: Date;
}

interface NutritionEntryCreationAttributes extends Optional<NutritionEntryAttributes, 'id' | 'createdAt'> {}

export default function NutritionEntry(sequelize: Sequelize) {
  class NutritionEntryModel extends Model<NutritionEntryAttributes, NutritionEntryCreationAttributes> implements NutritionEntryAttributes {
    public id!: string;
    public userId!: string;
    public name!: string;
    public calories!: number;
    public protein!: number;
    public carbs!: number;
    public fat!: number;
    public fiber?: number;
    public sugar?: number;
    public sodium?: number;
    public mealType!: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    public consumedAt!: Date;
    public readonly createdAt!: Date;

    static associate(models: any) {
      NutritionEntryModel.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE'
      });
    }
  }

  NutritionEntryModel.init(
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
      calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      protein: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      carbs: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      fat: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
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
      tableName: 'nutrition_entries',
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

  return NutritionEntryModel;
}
