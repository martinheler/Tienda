import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { Log } from '../models/logs';

export const getProducts = async (req: Request, res: Response): Promise<any> => {
  const products = await Product.findAll();
  res.json(products);
};

export const createProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, stock, price } = req.body;
    console.log("📌 Received Order Request:", req.body);
    // ✅ Validate product input
    if (!name || isNaN(stock) || isNaN(price) || stock <= 0 || price <= 0) {
      console.error("❌ Invalid product data. Stock and price must be positive numbers.");
      return res.status(400).json({ message: "Invalid product data. Stock and price must be positive numbers." });
    }

    const product = await Product.create({ name, stock, price });
    await Log.create({ action: "Producto creado", user: name });
    console.log("✅ Product created successfully:", product);
    return res.status(201).json({ message: "Product created successfully", product }); // ✅ Return 201 status
  } catch (error) {
    console.error("Error in createProduct:", error);
    return res.status(500).json({ message: "Error creating product", error });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<any> => {
  await Product.update(req.body, { where: { id: req.params.id } });
  res.json({ message: 'Producto actualizado' });
};

export const deleteProduct = async (req: Request, res: Response): Promise<any> => {
  await Product.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Producto eliminado' });
};