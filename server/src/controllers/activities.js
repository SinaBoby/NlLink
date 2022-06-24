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
    if (activityCategory == "all") {
      const activities = await Activity.find();

      res.status(200).json({
        success: true,
        result: activities,
      });
    } else {
      const activities = await Activity.find({
        category: { $regex: new RegExp(activityCategory, "i") },
      });

      res.status(200).json({
        success: true,
        result: activities,
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

export const joinToActivity = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`"${req.body.activityId}"`, userId, "request");

    const isUserJoining = await User.find({
      $and: [
        { _id: mongoose.Types.ObjectId(userId) },
        { activities: { $in: [mongoose.Types.ObjectId(req.body.activityId)] } },
      ],
    });

    if (isUserJoining.length === 0) {
      const updatedUserActivities = await User.updateOne(
        { _id: mongoose.Types.ObjectId(userId) },
        {
          $addToSet: {
            activities: mongoose.Types.ObjectId(req.body.activityId),
          },
        }
      );
      console.log(updatedUserActivities, "deleted user activity");
    } else {
      const updatedUserActivities = await User.updateOne(
        { _id: mongoose.Types.ObjectId(userId) },
        { $pull: { activities: mongoose.Types.ObjectId(req.body.activityId) } }
      );
      console.log(updatedUserActivities, "added user activity");
    }

    const userDetails = await User.find({
      _id: mongoose.Types.ObjectId(userId),
    });

    const userJoiningStatus = userDetails[0].activities.includes(
      req.body.activityId
    );

    console.log(userDetails, "server");
    console.log(userJoiningStatus, "server-userJoiningStatus");

    res.status(200).json({
      success: true,
      userJoiningStatus,
    });
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

export const getUserActivitiesList = async (req, res) => {
  try {
    const { userId } = req.params;

    const userDetails = await User.find({
      _id: mongoose.Types.ObjectId(userId),
    });

    const getUserActivitiesList = userDetails[0].activities;
    res.status(200).json({
      success: true,
      getUserActivitiesList,
    });
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
