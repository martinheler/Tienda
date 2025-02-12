import mongoose from 'mongoose';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const mongoUrl = process.env.MONGODB_URL;

if (!mongoUrl) {
  throw new Error('MONGODB_URL environment variable is not defined');
}

mongoose.connect(mongoUrl)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));