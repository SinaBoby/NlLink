import Activity from "../models/Activity.js";
import User from "../models/User.js";
import mongoose from "mongoose";
// import { logInfo } from "../util/logging.js";

const getUserActivities = async (req, res) => {
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

export default getUserActivities;
