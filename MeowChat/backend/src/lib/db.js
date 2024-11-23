import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const ConnectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGODB_URL);
    console.log("====================================");
    console.log(`MongoDB Connected : ${con.connection.host}`);
    console.log("====================================");
  } catch (error) {
    console.log("====================================");
    console.log(`MongoDB Connection : ${error}`);
    console.log("====================================");
  }
};
