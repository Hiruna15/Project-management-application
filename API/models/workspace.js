import mongoose from "mongoose";
const { Schema } = mongoose;

const workspaceSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Workspace name is required"],
    },
    description: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  },
  { timestamps: true }
);

const WorkspaceModel = mongoose.model("Workspace", workspaceSchema);

export default WorkspaceModel;
