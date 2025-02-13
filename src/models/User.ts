import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Order } from './Order';
import mongoose from "mongoose";

interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  orders_count?: number;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public orders_count!: number;
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // ✅ Ensure emails are unique
  },
  password: {
    type: String,
    required: true,
  },
  orders_count: {
    type: Number,
    default: 0, // ✅ Default value
  },
}, { timestamps: true });


const MongooseUser = mongoose.model("User", UserSchema);
export default MongooseUser;

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