import express from "express";
import WorkspaceModel from "../models/workspace.js";
const router = express.Router();

router.post("/", async (req, res) => {
  if (Object.keys(req.body).length !== 0) {
    const newWorkspace = await WorkspaceModel.create(req.body);
    return res.status(200).json({ data: newWorkspace });
  }

  res.status(500).json({ error: "error occured" });
});

router.get("/", async (req, res) => {
  const workspaces = await WorkspaceModel.find({});
  res.json({ workspaces });
});

export default router;
