import express from "express";
import withAuth from "../middlewares/middleware.js";
import {
  getUserActivities,
  getActivities,
  createActivity,
  deleteActivity,
} from "../controllers/activities.js";

const activitiesRouter = express.Router();

activitiesRouter.get("/user-activities", withAuth, getUserActivities);
activitiesRouter.get("/category/:activityCategory", withAuth, getActivities);
activitiesRouter.post("/create", withAuth, createActivity);
activitiesRouter.delete("/delete", withAuth, deleteActivity);

export default activitiesRouter;
