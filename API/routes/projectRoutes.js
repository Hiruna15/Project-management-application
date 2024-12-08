import express from "express";
import ProjectModel from "../models/project.js";

const router = express.Router();

router.post("/", async (req, res) => {
  if (Object.keys(req.body).length !== 0) {
    const newProject = await ProjectModel.create(req.body);
    return res.status(200).json({ data: newProject });
  }

  res.status(400).json({ error: "error occured" });
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
