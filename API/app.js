import express from "express";
import "dotenv/config";
import connectDB from "./config/dbConnection.js";
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import workspaceRoutes from "./routes/workspaceRoute.js";
import taskRoutes from "./routes/taskRoutes.js";
import errorHandler from "./errors/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  console.log("Connected to the database");
  app.listen(PORT, () => {
    console.log(`App is listening on the port ${PORT}`);
  });
};

start();
