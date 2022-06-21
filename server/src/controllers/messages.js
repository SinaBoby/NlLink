import { logError } from "../util/logging.js";
import User from "../models/User.js";

export const getMessages = async (req, res) => {
  const userName = req.userName;
  try {
    if (!userName) {
      res
        .status(401)
        .json({ success: false, msg: "You are not Authenticated" });
    } else {
      res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    logError(error);
  }
};
export const postMessage = async (req, res) => {
  try {
    const userName = req.userName;
    const { message } = req.body;
    if (!userName) {
      res
        .status(401)
        .json({ success: false, msg: "You are not Authenticated" });
    } else {
      const receiverObject = await User.findOne({ _id: message.receiver });
      res
        .status(200)
        .json({ success: true, message: message, receiverObj: receiverObject });
    }
  } catch (error) {
    logError(error);
  }
};
