import mongoose from "mongoose";
const { Schema } = mongoose;

const workspaceSchema = new Schema({
  name: {
    type: String,
    required: [true, "Workspace name is required"],
  },
  description: String,
});

const workspaceModel = mongoose.model("Workspace", workspaceSchema);

export default workspaceModel;
