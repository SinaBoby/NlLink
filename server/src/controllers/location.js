import User from "../models/User.js";
import { logError } from "../util/logging.js";

export const addLocation = async (req, res) => {
  const userName = req.userName;

  const { province } = req.body;
  try {
    if (!province) {
      return res.status(400).json({
        msg: "Bad Request: Location required!",
      });
    }
    const user = await User.findOne({ userName });
    if (!user) {
      throw new Error("Internal Server Error.");
    }

    await User.updateOne({ userName }, { $set: { province } });

    return res.status(200).json({ success: true, province });
  } catch (error) {
    logError(error);
    return res.status(500).json({
      msg: `Internal Server Error: ${error.message}`,
    });
  }
};
