import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB OK");
  } catch (error) {
    console.log("DB error", error);
  }
};
export default connectDB;
