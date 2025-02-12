import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Product } from './Product';  // ✅ Import Product Model

interface OrderAttributes {
  id?: number;
  user_id: number;
  product_id: number;
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id!: number;
  public user_id!: number;
  public product_id!: number;
  public total!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products', // ✅ Foreign key reference to `Product`
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'orders',
    timestamps: true, // ✅ Sequelize will manage `createdAt` and `updatedAt`
  }
);

// ✅ Define Relationship with Product
if (Product) {
  Order.belongsTo(Product, { foreignKey: 'product_id' });
} else {
  console.error('❌ Product model is not properly initialized before defining relationships');
}
