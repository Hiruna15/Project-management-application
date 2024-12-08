import express from "express";
import ProjectModel from "../models/project.js";
import "express-async-errors";
import AppError from "../errors/AppError.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/", async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError("No data is sent in the request body", 401));
  }

  const newProject = await ProjectModel.create(req.body);
  res.status(200).json({ data: newProject });
});

router.get("/:workspaceId", async (req, res, next) => {
  const workspaceId = req.params.workspaceId;

  if (!mongoose.isValidObjectId(workspaceId)) {
    return next(new AppError("Invalid workspaceId provided", 400));
  }

  const projects = await ProjectModel.find({ workspace: workspaceId });

  if (projects.length === 0) {
    return next(
      new AppError("No projects found for the given workspaceId", 404)
    );
  }

  res.status(200).json({ data: projects });
});

router.patch("/update/:workspaceId/:projectId", async (req, res, next) => {
  const data = req.body;
  const { workspaceId, projectId } = req.params;

  if (Object.keys(data).length === 0) {
    return next(new AppError("No data is sent in the request body", 401));
  }

  if (!workspaceId || !projectId) {
    return next(
      new AppError("some data is missing in the request params", 401)
    );
  }

  if (
    !mongoose.isValidObjectId(workspaceId) ||
    !mongoose.isValidObjectId(projectId)
  ) {
    return next(new AppError("Invalid workspaceId or projectId provided", 400));
  }

  const project = await ProjectModel.findOne({
    workspace: workspaceId,
    _id: projectId,
  });

  if (Object.keys(project).length === 0) {
    return next(
      new AppError(
        "No projects found for the given workspace and projectid",
        404
      )
    );
  }

  const updatedProject = await ProjectModel.findByIdAndUpdate(
    project._id,
    data,
    { runValidators: true, new: true }
  );

  res.status(200).json({ data: updatedProject });
});

router.get("/", async (req, res) => {
  const projects = await ProjectModel.find({});
  res.json({ projects });
});

export default router;
