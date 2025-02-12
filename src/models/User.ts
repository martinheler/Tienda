import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Order } from './Order';

interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  orders_count: number;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public orders_count!: number;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orders_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, 
    }
  },
  {
    sequelize,
    tableName: 'users',
  }
);

User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });