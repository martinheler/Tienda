import express from 'express';
import routeProduct from './routes/routeProduct';
import routeUser from './routes/routeUser';
import routeOrder from './routes/routeOrder';
import routeReport from './routes/routeReport';
import * as http from 'http';
import { Server } from 'socket.io';
import { getDailySalesData, getBestSellingProductData, getTopUsersData } from './services/serviceReport';
import { authenticateToken } from './middleware/middlewareAuth';
import { errorHandler } from './middleware/middlewareError';
import { config as dotenvConfig } from 'dotenv';
import connectMongoDB from './config/mongo';

dotenvConfig();
connectMongoDB();

export const app = express(); // ✅ Export app for Jest

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());
app.use('/products', authenticateToken, routeProduct);
app.use('/orders', authenticateToken, routeOrder);
app.use('/reports', authenticateToken, routeReport);
app.use('/users', routeUser);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') { // ✅ Prevent Jest from running WebSockets
  io.on('connection', (socket) => {
    console.log('Cliente conectado');

    const sendReports = async () => {
      io.emit('report:update', {
        sales: await getDailySalesData(),
        bestProduct: await getBestSellingProductData(),
        topUsers: await getTopUsersData(),
      });
    };

    sendReports();
  });

  const PORT = process.env.PORT ?? 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
