import { logInfo, logError } from "../util/logging.js";
import User from "../models/User.js";
import { Message, MessageSchema } from "../models/Message.js";
import { ObjectId } from "mongodb";
export const getMessages = async (req, res) => {
  const userName = req.userName;
  const io = req.app.get("socketio");
  try {
    const { receiverId } = req.body;
    const receiverObjId = new ObjectId(receiverId);
    //console.log(receiverObjId);
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
      io.on("connection", async (socket) => {
        try {
          logInfo("client connected...");
          logInfo(socket.handshake.headers.cookie.split(";")[0].split("=")[1]);
          // logInfo(socket.id);
          socket.on("message", async (msg) => {
            try {
              logInfo(msg);
              let message = await Message.create(msg);
              logInfo(message);
              socket.emit("message", message);
              io.on("disconnect", () => {
                logInfo("Disconnected ...");
              });
            } catch (error) {
              logError(error);
            }
          });
          let latest = await MessageSchema.statics.latest(
            user._id,
            receiverObjId
          );
          socket.emit("chatHistory", latest);
        } catch (error) {
          logError(error);
        }
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
    const { message } = req.body;
    const io = req.app.get("socketio");
    logInfo(req.body);
    if (!userName) {
      res
        .status(401)
        .json({ success: false, msg: "You are not Authenticated" });
    } else {
      //const receiver = await User.findOne({ userName });
      const msg = await Message.create(message);
      const receiverObject = await User.findOne({ _id: message.receiver });
      io.emit("message", msg);
      res
        .status(200)
        .json({ success: true, message: msg, receiverObj: receiverObject });
    }
  } catch (error) {
    logError(error);
  }
};
