import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Order } from './Order';  // ✅ Import Order Model
import mongoose from "mongoose";

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


const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const mongooseProduct = mongoose.model("Product", ProductSchema);
export default mongooseProduct;

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

