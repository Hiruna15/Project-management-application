import express from "express";
import {
  createProject,
  getProjectsInaWorkspace,
  updateProject,
  deleteProject,
  filterProjects,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", createProject);

router.get("/filter", filterProjects);

router.get("/:workspaceId", getProjectsInaWorkspace);

router.patch("/:workspaceId/:projectId", updateProject);

router.delete("/:workspaceId/:projectId", deleteProject);

export default router;
