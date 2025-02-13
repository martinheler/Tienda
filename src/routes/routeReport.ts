import { Router } from 'express';
import { getDailySales, getBestSellingProduct, getTopUsers } from '../controllers/controllerReport';
import { authenticateToken } from '../middleware/middlewareAuth';

const router = Router();

router.get('/daily-sales', authenticateToken, getDailySales);
router.get('/best-selling-product', authenticateToken, getBestSellingProduct);
router.get('/top-users', authenticateToken, getTopUsers);

export default router;
