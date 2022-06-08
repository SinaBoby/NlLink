import Activity from "../models/Activity.js";
import User from "../models/User.js";
// import { logInfo } from "../util/logging.js";
import mongoose from "mongoose";

const getUserActivities = async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const userName = req.userName;
    // logInfo(userName);
    const user = await User.findOne({ userName });
    const activities = await Activity.find({
      joinedBy: { $in: [mongoose.Types.ObjectId(user._id)] },
    });

    res.status(200).json({ success: true, result: activities });
  } catch (e) {
    res.send({ msg: "Error in Fetching user" });
  }
};

export default getUserActivities;
