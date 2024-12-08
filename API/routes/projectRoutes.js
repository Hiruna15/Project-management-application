import express from "express";
import {
  createProject,
  getProjectsInaWorkspace,
  updateProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", createProject);

router.get("/:workspaceId", getProjectsInaWorkspace);

router.patch("/update/:workspaceId/:projectId", updateProject);

export default router;
