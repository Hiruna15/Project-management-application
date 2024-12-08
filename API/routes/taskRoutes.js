import express from "express";
import TaskModel from "../models/task.js";

const router = express.Router();

router.post("/", async (req, res) => {
  if (Object.keys(req.body).length !== 0) {
    const newTask = await TaskModel.create(req.body);
    return res.status(200).json({ data: newTask });
  }

  res.status(400).json({ error: "Error occured" });
});

export default router;
