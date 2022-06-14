import express from "express";
import withAuth from "../middlewares/middleware.js";
import getNews from "../controllers/news.js";

const newsRouter = express.Router();

newsRouter.get("/", withAuth, getNews);

export default newsRouter;
