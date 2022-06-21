import express from "express";
import withAuth from "../middlewares/middleware.js";
import { getUserActivities } from "../controllers/activities.js";

const activitiesRouter = express.Router();

activitiesRouter.get("/user-activities", withAuth, getUserActivities);
activitiesRouter.get(
  "/category/:activityCategory",
  withAuth,
  getUserActivities
);

export default activitiesRouter;
