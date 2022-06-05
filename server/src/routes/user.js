import express from "express";
import { createUser, getUsers, getLoggedInUser } from "../controllers/user.js";
import withAuth from "../middlewares/middleware.js";

const userRouter = express.Router();

userRouter.get("/", withAuth, getUsers);
userRouter.get("/me", withAuth, getLoggedInUser);
userRouter.post("/create", createUser);

export default userRouter;
