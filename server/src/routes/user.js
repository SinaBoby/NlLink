import express from "express";
import {
  createUser,
  getUserDetails,
  getLoggedInUser,
  logout,
} from "../controllers/user.js";
import withAuth from "../middlewares/middleware.js";

const userRouter = express.Router();

userRouter.get("/", withAuth, getUserDetails);
userRouter.post("/logout", withAuth, logout);
userRouter.get("/me", withAuth, getLoggedInUser);
userRouter.post("/create", createUser);

export default userRouter;
