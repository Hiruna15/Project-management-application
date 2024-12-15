import express from "express";
import {
  createProject,
  getProjectsInaWorkspace,
  updateProject,
  deleteProject,
  filterProjects,
  test,
} from "../controllers/projectController.js";
import verifyAndRefreshToken from "../middlewares/verifyAndRefreshToken.js";

const router = express.Router();

router.use(verifyAndRefreshToken);

router.post("/", createProject);

router.get("/filter", filterProjects);

router.get("/:workspaceId", getProjectsInaWorkspace);

router.patch("/:workspaceId/:projectId", updateProject);

router.delete("/:workspaceId/:projectId", deleteProject);

router.get("/", test);

export default router;
