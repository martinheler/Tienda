import { Request, Response } from 'express';
import { getDailySalesData, getBestSellingProductData, getTopUsersData } from '../services/serviceReport';

export const getDailySales = async (req: Request, res: Response): Promise<any> => {
  try {
    const sales = await getDailySalesData();
    res.json({ sales });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ventas diarias', error });
  }
};

export const getBestSellingProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const bestProduct = await getBestSellingProductData();
    res.json({ bestProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto más vendido', error });
  }
};

export const getTopUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const topUsers = await getTopUsersData();
    res.json({ topUsers });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios con más compras', error });
  }
};