import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  user: { type: String },
  timestamp: { type: Date, default: Date.now }
});

export const Log = mongoose.model('Log', LogSchema);
