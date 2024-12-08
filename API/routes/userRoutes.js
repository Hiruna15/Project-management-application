import express from "express";
import UserModel from "../models/user.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  if (Object.keys(req.body).length !== 0) {
    const newUser = await UserModel.create(req.body);
    res.status(200).json({ data: newUser });
  } else {
    res.json({ error: "All data must be provided" });
  }
});

export default router;
