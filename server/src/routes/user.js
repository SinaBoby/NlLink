import express from "express";
import {
  createUser,
  getUserDetails,
  getLoggedInUser,
  logout,
} from "../controllers/user.js";
import getUserActivities from "../controllers/userActivities.js";
import withAuth from "../middlewares/middleware.js";
import getNews from "../controllers/news.js";
import getUserRecentChat from "../controllers/userChat.js";
const userRouter = express.Router();

userRouter.get("/", withAuth, getUserDetails);
userRouter.post("/logout", withAuth, logout);
userRouter.get("/me", withAuth, getLoggedInUser);
userRouter.post("/create", createUser);
userRouter.get("/activities", withAuth, getUserActivities);
userRouter.get("/recent-chat", withAuth, getUserRecentChat);
userRouter.get("/news", withAuth, getNews);

export default userRouter;
