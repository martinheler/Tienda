import { Request, Response } from 'express';
import { getDailySalesData, getBestSellingProductData, getTopUsersData } from '../services/serviceReport';


export const getDailySales = async (req: Request, res: Response): Promise<any> => {
  try {
    const sales = await getDailySalesData();
    console.log("Ventas diarias:", sales);
    res.json({ sales });
  } catch (error) {
    console.error("Error al obtener ventas diarias:", error);
    res.status(500).json({ message: 'Error al obtener ventas diarias', error });
  }
};

export const getBestSellingProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const bestProduct = await getBestSellingProductData();
    console.log("Producto más vendido:", bestProduct);
    res.json({ bestProduct });
  } catch (error) {
    console.error("Error al obtener el producto más vendido:", error);
    res.status(500).json({ message: 'Error al obtener el producto más vendido', error });
  }
};

export const getTopUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const topUsers = await getTopUsersData();
    console.log("Usuarios con más compras:", topUsers);
    res.json({ topUsers });
  } catch (error) {
    console.error("Error al obtener los usuarios con más compras:", error);
    res.status(500).json({ message: 'Error al obtener los usuarios con más compras', error });
  }
};