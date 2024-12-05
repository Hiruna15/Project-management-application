import express from "express";
import "dotenv/config";
import connectDB from "./config/dbConnection.js";
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  console.log("Connected to the database");
  app.listen(PORT, () => {
    console.log(`App is listening on the port ${PORT}`);
  });
};

start();
