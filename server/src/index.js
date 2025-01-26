import connectDB from "../db/index.js";
import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err?.message);
  });
