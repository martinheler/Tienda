import { Request, Response } from 'express';
import { getDailySalesData, getBestSellingProductData, getTopUsersData } from '../services/serviceReport';
import { Order } from '../models/Order';  // ✅ Import Order
import { Product } from '../models/Product'; // ✅ Import Product


export const getDailySales = async (req: Request, res: Response): Promise<any> => {
  try {
    const totalSales = await getDailySalesData();
    console.log("Total sales:", totalSales); // ✅ Log sales data

    return res.status(200).json({ totalSales });
  } catch (error) {
    console.error("Error in getDailySales:", error);
    return res.status(500).json({ message: "Error fetching daily sales" });
  }
};

export const getBestSellingProduct = async (req: Request, res: Response): Promise<any> => {
    try {
      const product = await getBestSellingProductData();
      console.log("Best selling product response:", product); // ✅ Log response
  
      if (!product) {
        return res.status(404).json({ message: "No product data available" });
      }
  
      return res.status(200).json({ product });
    } catch (error) {
      console.error("Error in getBestSellingProduct:", error);
      return res.status(500).json({ message: "Error fetching best-selling product", error });
    }
  };
  
  export const createOrder = async (req: Request, res: Response): Promise<any> => {
    try {
      console.log("Received request body:", req.body); // ✅ Log request data
  
      const { user_id, product_id, total } = req.body;
  
      if (!user_id || !product_id || !total) {  // ✅ Validate input
        console.error("Validation failed: user_id, product_id, or total is missing"); 
        return res.status(400).json({ message: "user_id, product_id, and total are required" });
      }
  
      // ✅ Ensure product exists before creating an order
      const product = await Product.findByPk(product_id);
      if (!product) {
        console.error(`Product with id ${product_id} not found`); // ✅ Log issue
        return res.status(404).json({ message: "Product not found" });
      }
  
      const order = await Order.create({ user_id, product_id, total });
  
      res.status(201).json({ message: 'Pedido creado exitosamente', order });
    } catch (error) {
      console.error("Error in createOrder:", error);  // ✅ Log errors
      res.status(500).json({ message: 'Error al crear el pedido', error });
    }
  };
  
  

export const getTopUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await getTopUsersData();
    console.log("Top users:", users); // ✅ Log top users

    if (!users.length) {
      return res.status(404).json({ message: "No top users data available" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error in getTopUsers:", error);
    return res.status(500).json({ message: "Error fetching top users" });
  }
};
