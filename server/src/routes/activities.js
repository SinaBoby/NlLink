import express from "express";
import withAuth from "../middlewares/middleware.js";
import getActivities from "../controllers/activities.js";

const activitiesRouter = express.Router();

activitiesRouter.get("/", withAuth, getActivities);

export default activitiesRouter;
