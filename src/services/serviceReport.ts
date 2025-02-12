import { Order } from '../models/Order'; // Asegúrate de que sea el nombre correcto
import { Product } from '../models/Product';
import { User } from '../models/User';
import { Op, fn, col, literal } from 'sequelize';
import { sequelize } from '../config/database'; // Asegúrate de importar la instancia de Sequelize




export const getDailySalesData = async () => {
  const todayStart = new Date(new Date().setHours(0, 0, 0, 0)); // ✅ Ensure it's a Date object

  const totalSales = await Order.sum('total', {
    where: {
      createdAt: {
        [Op.gte]: todayStart, // ✅ Now correctly compares as a Date
      }
    }
  });

  return totalSales ?? 0; // ✅ Ensure it always returns a number
};


export const getBestSellingProductData = async () => {
  try {
    const bestProduct = await Order.findOne({
      attributes: ['product_id', [fn('COUNT', col('product_id')), 'sales_count']],
      group: ['product_id'],
      order: [[literal('sales_count'), 'DESC']],
      limit: 1,
    });

    console.log("Best-Selling Product Query Result:", bestProduct); // ✅ Log query result

    if (!bestProduct) {
      return { message: "No sales yet" }; // ✅ Return message instead of null
    }

    // ✅ Fetch full product details
    const product = await Product.findByPk(bestProduct.getDataValue('product_id'));

    return product ? product.get({ plain: true }) : { message: "Product not found" };
  } catch (error) {
    console.error("Error in getBestSellingProductData:", error); // ✅ Log exact error
    return { message: "Error fetching best-selling product" };
  }
};


export const getTopUsersData = async () => {
  try {
    const topUsers = await Order.findAll({
      attributes: [
        'user_id',
        [sequelize.literal('COUNT(id)'), 'orders_count'], // ✅ Use `literal` for computed fields
      ],
      group: ['user_id'],
      order: [[sequelize.literal('orders_count'), 'DESC']],
      limit: 3,
      raw: true, // ✅ Ensures the result is a plain JSON object
    });

    return topUsers.length > 0 ? topUsers : []; // ✅ Always return an array
  } catch (error) {
    console.error("Error in getTopUsersData:", error);
    return [];
  }
};

