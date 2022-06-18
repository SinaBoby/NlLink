import { logInfo, logError } from "../util/logging.js";
import User from "../models/User.js";
import { Message } from "../models/Message.js";
import { io } from "../index.js";
export const getMessages = async (req, res) => {
  const userName = req.userName;
  try {
    const { receiverId } = req.body;
    //console.log(receiverId);
    if (!userName) {
      res
        .status(401)
        .json({ success: false, msg: "You are not Authenticated" });
    } else {
      const user = await User.findOne({ userName });
      const sentMessages = await Message.find({
        sender: user._id,
        receiver: receiverId,
      });
      const receivedMessages = await Message.find({
        receiver: user._id,
        sender: receiverId,
      });

      res.status(200).json({
        success: true,
        messages: { ...sentMessages, ...receivedMessages },
      });
    }
  } catch (error) {
    logError(error);
  }
};
export const postMessage = async (req, res) => {
  try {
    const userName = req.userName;
    const message = req.body;
    logInfo(req.body);
    if (!userName) {
      res
        .status(401)
        .json({ success: false, msg: "You are not Authenticated" });
    } else {
      //const receiver = await User.findOne({ userName });
      const msg = await Message.create(message);
      const receiverObject = await User.findOne({ _id: message.receiver });
      io.emit("message", message);
      res
        .status(200)
        .json({ success: true, message: msg, receiverObj: receiverObject });
    }
  } catch (error) {
    logError(error);
  }
};
