import { Request, Response } from 'express';
import { Order } from '../models/Order';
import { User } from '../models/User';
import { Product } from '../models/Product';


export const createOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log("Received request body:", req.body); // ✅ Log request data

    let { user_id, product_id, total } = req.body;

    // Convert IDs and total to numbers
    user_id = Number(user_id);
    product_id = Number(product_id);
    total = Number(total);

    if (isNaN(user_id) || isNaN(product_id) || isNaN(total) || user_id <= 0 || product_id <= 0 || total <= 0) {  
      console.error("Validation failed: Invalid user_id, product_id, or total"); 
      return res.status(400).json({ message: "Invalid user_id, product_id, or total. Must be a positive number." });
    }

    // ✅ Ensure user exists before creating an order
    const user = await User.findByPk(user_id);
    if (!user) {
      console.error(`User with id ${user_id} not found`); 
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Ensure product exists before creating an order
    const product = await Product.findByPk(product_id);
    if (!product) {
      console.error(`Product with id ${product_id} not found`); 
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ Ensure stock is available before creating an order
    if (product.stock <= 0) {
      console.error(`Product ${product_id} is out of stock`); 
      return res.status(400).json({ message: "Product is out of stock" });
    }

    // ✅ Reduce stock after order is placed
    await product.update({ stock: product.stock - 1 });

    // ✅ Create Order
    const order = await Order.create({ user_id, product_id, total });

    res.status(201).json({ message: 'Pedido creado exitosamente', order });
  } catch (error) {
    console.error("Error in createOrder:", error);
    res.status(500).json({ message: 'Error al crear el pedido', error });
  }
};

export const getUserOrders = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log("Fetching orders for user:", req.params.userId);

    const userId = Number(req.params.userId);

    if (isNaN(userId) || userId <= 0) {
      console.error("Invalid userId:", req.params.userId);
      return res.status(400).json({ message: "Invalid userId. Must be a positive number." });
    }

    const orders = await Order.findAll({ where: { user_id: userId } });

    if (!orders.length) {
      console.warn(`No orders found for user ${userId}`);
      return res.status(200).json([]); // ✅ Return empty array instead of 404
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error in getUserOrders:", error);
    return res.status(500).json({ message: 'Error al obtener los pedidos del usuario', error });
  }
};