import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const database = process.env.NODE_ENV === "test" ? ":memory:" : "./database.sqlite"; // ✅ Use in-memory DB for tests

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: database,
  logging: false,
});
