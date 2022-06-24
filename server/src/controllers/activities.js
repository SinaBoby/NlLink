import Activity from "../models/Activity.js";
import User from "../models/User.js";
import mongoose from "mongoose";
// import { logInfo } from "../util/logging.js";

const getActivities = async (req, res) => {
  try {
    const userName = req.userName;
    const user = await User.findOne({ userName });
    const upcomingActivities = await Activity.find({
      joinedBy: { $in: [mongoose.Types.ObjectId(user._id)] },
    });

    const recommendedActivities = await Activity.find({
      joinedBy: { $ne: mongoose.Types.ObjectId(user._id) },
    });
    if (!userName) {
      throw new Error("You are not authenticated.");
    } else if (!user) {
      throw new Error("Internal Server Error: User not found");
    } else if (!upcomingActivities && !recommendedActivities) {
      throw new Error("There is no upcoming or recommended activities");
    } else {
      res.status(200).json({
        success: true,
        result: { upcomingActivities, recommendedActivities },
      });
    }
  } catch (e) {
    return res.status(500).json({
      msg: `Error in Fetching User Activities: ${e.message}`,
    });
  }
};

export default getActivities;
