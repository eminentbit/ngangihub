import { connect } from "mongoose";
import { config } from "dotenv";
config();

const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB Connecttion error", error);
    process.exit(1);
  }
};

export default connectDB;
