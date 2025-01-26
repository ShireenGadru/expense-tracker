import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoConnection = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `\n MongoDB Connected!! DB HOST: ${mongoConnection.connection.host}`
    );
  } catch (error) {
    console.log("Error while connecting to databse", error?.message);
    process.exit(1);
  }
};

export default connectDB;
