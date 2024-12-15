import "express-async-errors";
import mongoose from "mongoose";
import AppError from "../errors/AppError.js";
import ProjectModel from "../models/project.js";

const createProject = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError("No data sent in the request body", 400));
  }

  const newProject = await ProjectModel.create(req.body);
  res.status(200).json({ data: newProject });
};

const getProjectsInaWorkspace = async (req, res, next) => {
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
};

const updateProject = async (req, res, next) => {
  const data = req.body;
  const { workspaceId, projectId } = req.params;

  if (Object.keys(data).length === 0) {
    return next(new AppError("No data sent in the request body", 400));
  }

  if (
    !mongoose.isValidObjectId(workspaceId) ||
    !mongoose.isValidObjectId(projectId)
  ) {
    return next(new AppError("Invalid workspaceId or projectId provided", 400));
  }

  const updatedProject = await ProjectModel.findByIdAndUpdate(
    { workspace: workspaceId, _id: projectId },
    data,
    { runValidators: true, new: true }
  );

  if (!updatedProject) {
    return next(
      new AppError(
        "No projects found for the given workspaceId and projectId",
        404
      )
    );
  }

  res.status(200).json({ data: updatedProject });
};

const deleteProject = async (req, res, next) => {
  const { workspaceId, projectId } = req.params;

  if (
    !mongoose.isValidObjectId(workspaceId) ||
    !mongoose.isValidObjectId(projectId)
  ) {
    return next(new AppError("Invalid workspaceId or projectId provided", 400));
  }

  const deletedProject = await ProjectModel.findOneAndDelete({
    workspace: workspaceId,
    _id: projectId,
  });

  if (!deletedProject) {
    return next(
      new AppError(
        "No projects found for the given workspaceId and projectId",
        404
      )
    );
  }

  res.status(200).json({ delete: "success", data: deletedProject });
};

const filterProjects = async (req, res, next) => {
  const { status } = req.query;
  const validStatuses = ["active", "completed", "archived"];

  if (!status) {
    return next(new AppError("Status filter option is not provided", 400));
  }

  const statuses = status
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (statuses.length === 0) {
    return next(new AppError("No valid filter options provided", 400));
  }

  const invalidStatuses = statuses.filter(
    (status) => !validStatuses.includes(status)
  );

  if (invalidStatuses.length > 0) {
    return next(
      new AppError(
        `Invalid statuses provided: ${invalidStatuses.join(", ")}`,
        400
      )
    );
  }

  const filteredProjects = await ProjectModel.find({
    status: { $in: statuses },
  });

  res.status(200).json({ status: "success", data: filteredProjects });
};

const test = async (req, res) => {
  console.log(req.user);
  const projects = await ProjectModel.find({});
  res.status(200).json({ projects });
};

export {
  createProject,
  getProjectsInaWorkspace,
  updateProject,
  deleteProject,
  filterProjects,
  test,
};
