import express from "express";
import { createUser, getLoggedInUser, logout } from "../controllers/user.js";
// import getUserActivities from "../controllers/userActivities.js";
import withAuth from "../middlewares/middleware.js";
import getUserRecentChat from "../controllers/userChat.js";

const userRouter = express.Router();

userRouter.post("/logout", withAuth, logout);
userRouter.get("/me", withAuth, getLoggedInUser);
userRouter.post("/create", createUser);
// userRouter.get("/activities", withAuth, getUserActivities);
userRouter.get("/recent-chat", withAuth, getUserRecentChat);

export default userRouter;
