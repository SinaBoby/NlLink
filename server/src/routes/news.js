import express from "express";
import withAuth from "../middlewares/middleware.js";
import { getNews, getNewsDetails } from "../controllers/news.js";

const newsRouter = express.Router();

newsRouter.get("/", withAuth, getNews);
newsRouter.get("/:newsId", withAuth, getNewsDetails);

export default newsRouter;
