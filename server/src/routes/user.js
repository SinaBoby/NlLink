import express from "express";
import path from "path";
import {
  createUser,
  // getUserDetails,
  getLoggedInUser,
  logout,
} from "../controllers/user.js";
import getUserActivities from "../controllers/userActivities.js";
import withAuth from "../middlewares/middleware.js";
import getNews from "../controllers/news.js";
import getUserRecentChat from "../controllers/userChat.js";
import multer from "multer";
const userRouter = express.Router();
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname + "/../" + "controllers/" + "uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
//userRouter.get("/", withAuth, getUserDetails);
userRouter.post("/logout", withAuth, logout);
userRouter.get("/me", withAuth, getLoggedInUser);
userRouter.post("/create", upload.single("profileImage"), createUser);
userRouter.get("/activities", withAuth, getUserActivities);
userRouter.get("/recent-chat", withAuth, getUserRecentChat);
userRouter.get("/news", withAuth, getNews);

export default userRouter;
