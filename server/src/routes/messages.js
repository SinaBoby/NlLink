import express from "express";
import withAuth from "../middlewares/middleware.js";
import getMessages from "../controllers/messages.js";

const messagesRouter = express.Router();

messagesRouter.get("/", withAuth, getMessages);

export default messagesRouter;
