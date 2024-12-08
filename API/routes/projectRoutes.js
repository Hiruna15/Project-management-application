import express from "express";
import ProjectModel from "../models/project.js";
import "express-async-errors";
import AppError from "../errors/AppError.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError("No data is sent in the request body", 401));
  }

  const newProject = await ProjectModel.create(req.body);
  res.status(200).json({ data: newProject });
});

router.get("/", async (req, res) => {
  const projects = await ProjectModel.find();
  res.status(200).json({ data: projects });
});

router.get("/:workspaceId", async (req, res) => {
  const workspaceId = req.params.workspaceId;
  const projects = await ProjectModel.find({ workspace: workspaceId });
  res.status(200).json({ data: projects });
});

export default router;
