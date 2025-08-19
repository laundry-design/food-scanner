import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface UserGoalAttributes {
  id: string;
  userId: string;
  targetCalories?: number;
  targetProtein?: number;
  targetCarbs?: number;
  targetFat?: number;
  targetFiber?: number;
  createdAt: Date;
  updatedAt: Date;
}

interface UserGoalCreationAttributes extends Optional<UserGoalAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export default function UserGoal(sequelize: Sequelize) {
  class UserGoalModel extends Model<UserGoalAttributes, UserGoalCreationAttributes> implements UserGoalAttributes {
    public id!: string;
    public userId!: string;
    public targetCalories?: number;
    public targetProtein?: number;
    public targetCarbs?: number;
    public targetFat?: number;
    public targetFiber?: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      UserGoalModel.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE'
      });
    }
  }

  UserGoalModel.init(
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
      targetCalories: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      targetProtein: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      targetCarbs: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      targetFat: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      targetFiber: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
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
      tableName: 'user_goals',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['user_id'],
        },
      ],
    }
  );

  return UserGoalModel;
}
