import Activity from "../models/Activity.js";
import User from "../models/User.js";
import mongoose from "mongoose";
// import { logInfo } from "../util/logging.js";
import { logError, logInfo } from "../util/logging.js";

export const getUserActivities = async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const userName = req.userName;
    // logInfo(userName);
    const user = await User.findOne({ userName });
    const upcomingActivities = await Activity.find({
      joinedBy: { $in: [mongoose.Types.ObjectId(user._id)] },
    });

    const recommendedActivities = await Activity.find({
      joinedBy: { $ne: mongoose.Types.ObjectId(user._id) },
    });

    res.status(200).json({
      success: true,
      result: { upcomingActivities, recommendedActivities },
    });
  } catch (e) {
    res.send({ msg: "Error in Fetching User Activities" });
  }
};

export const getActivities = async (req, res) => {
  try {
    const { activityCategory } = req.params;
    if (activityCategory === "All") {
      const allActivities = await Activity.find();
      res.status(200).json({
        success: true,
        result: allActivities,
      });
    } else {
      const selectedActivities = await Activity.find({
        category: { $in: [activityCategory] },
      });
      res.status(200).json({
        success: true,
        result: selectedActivities,
      });
    }
  } catch (error) {
    const errors = [];
    if (error.errors) {
      Object.keys(error.errors).forEach((key) => {
        errors.push(`${key} : ${error.errors[key].message}`);
      });
      logError(error);
      return res
        .status(400)
        .json({ success: false, msg: `Bad Request: ${errors}` });
    } else {
      logError(error);
      return res.status(500).json({
        success: false,
        msg: `Server Error: ${error.message}`,
      });
    }
  }
};

export const createActivity = async (req, res) => {
  try {
    const activityId = req.activityId;
    logInfo(activityId);
  } catch (error) {
    const errors = [];
    if (error.errors) {
      Object.keys(error.errors).forEach((key) => {
        errors.push(`${key} : ${error.errors[key].message}`);
      });
      logError(error);
      return res
        .status(400)
        .json({ success: false, msg: `Bad Request: ${errors}` });
    } else {
      logError(error);
      return res.status(500).json({
        success: false,
        msg: `Server Error: ${error.message}`,
      });
    }
  }
};

export const deleteActivity = async (req, res) => {
  try {
    const userName = req.userName;
    logInfo(userName);
  } catch (error) {
    const errors = [];
    if (error.errors) {
      Object.keys(error.errors).forEach((key) => {
        errors.push(`${key} : ${error.errors[key].message}`);
      });
      logError(error);
      return res
        .status(400)
        .json({ success: false, msg: `Bad Request: ${errors}` });
    } else {
      logError(error);
      return res.status(500).json({
        success: false,
        msg: `Server Error: ${error.message}`,
      });
    }
  }
};
