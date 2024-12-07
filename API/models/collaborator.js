import mongoose from "mongoose";
const { Schema } = mongoose;

const collaborationSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: ["owner", "project_manager", "team_member"],
      message: "{VALUE} is not a valid user role",
    },
    default: "team_member",
  },
  permissions: [
    {
      type: String,
      enum: {
        values: [
          "create_task",
          "update_task",
          "delete_task",
          "view_task",
          "delete_project",
          "all",
        ],
        message: "{VALUE} is not a valid permission type",
      },
      required: [
        true,
        "relavant permission must be granted to the collaborator",
      ],
    },
  ],
});

const CollaboratorModel = mongoose.model("Collaborator", collaborationSchema);

export default CollaboratorModel;
