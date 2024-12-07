import mongoose from "mongoose";
const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "You must enter a project name"],
    },
    description: String,
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    tasks: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
    status: {
      type: String,
      enum: {
        values: ["active", "completed", "archived"],
        message: "{VALUE} is not a valid status!",
      },
      default: "active",
    },
    startDate: { type: Date },
    endDate: { type: Date },
    ownerId: {
      type: Number,
      required: true,
    },
    pmId: Number,
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Project", projectSchema);

export default ProjectModel;
