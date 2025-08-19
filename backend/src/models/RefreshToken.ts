import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface RefreshTokenAttributes {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
}

interface RefreshTokenCreationAttributes extends Optional<RefreshTokenAttributes, 'id' | 'createdAt'> {}

export default function RefreshToken(sequelize: Sequelize) {
  class RefreshTokenModel extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes> implements RefreshTokenAttributes {
    public id!: string;
    public token!: string;
    public userId!: string;
    public expiresAt!: Date;
    public readonly createdAt!: Date;

    static associate(models: any) {
      RefreshTokenModel.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE'
      });
    }
  }

  RefreshTokenModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      token: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'refresh_tokens',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['token'],
        },
        {
          fields: ['user_id'],
        },
        {
          fields: ['expires_at'],
        },
      ],
    }
  );

  return RefreshTokenModel;
}
