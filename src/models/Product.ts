import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Order } from './Order';  // ✅ Import Order Model

interface ProductAttributes {
  id?: number;
  name: string;
  stock: number;
  price: number;
}

export class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public stock!: number;
  public price!: number;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {  // ✅ Add price column
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'products',
  }
);

// ✅ Define Relationship with Orders

export default Product;
