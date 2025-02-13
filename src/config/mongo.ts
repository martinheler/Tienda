import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUrl = process.env.MONGO_URI; // Ensure the correct env variable

if (!mongoUrl) {
  throw new Error("❌ MONGO_URI environment variable is not defined");
}

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoUrl);

    console.log("✅ MongoDB Connected Successfully to", mongoUrl);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectMongoDB;