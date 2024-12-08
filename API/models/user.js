import mongoose from "mongoose";
const { Schema } = mongoose;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d@$!%*?&^#-]{8,}$/;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "A username must be provided"],
      unique: [true, "The username you provided({VALUE}) is already exist"],
    },
    email: {
      type: String,
      required: [true, "Email must be provided"],
      unique: [
        true,
        "An account is already using this email addresss you provided({VALUE})",
      ],
      match: [emailRegex, "Invalid Email"],
    },
    password: {
      type: String,
      required: true,
      min: [8, "Password must include at least 8 characters, you got {VALUE}"],
      max: [50, "Password cannot have more than 50 characters"],
      match: [passwordRegex, "Not a strong password"],
    },
    workspaces: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workspace" }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
