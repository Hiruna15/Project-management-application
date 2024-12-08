import express from "express";
import "dotenv/config";
import connectDB from "./config/dbConnection.js";
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import workspaceRoutes from "./routes/workspaceRoute.js";
import taskRoutes from "./routes/taskRoutes.js";
const app = express();

app.use(express.json());

app.use("/api/project", projectRoutes);
app.use("/api/user", userRoutes);
app.use("/api/workspace", workspaceRoutes);
app.use("/api/task", taskRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  console.log("Connected to the database");
  app.listen(PORT, () => {
    console.log(`App is listening on the port ${PORT}`);
  });
};

start();
