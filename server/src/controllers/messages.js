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
    if (!userName) {
      res
        .status(401)
        .json({ success: false, msg: "You are not Authenticated" });
    } else {
      const user = await User.findOne({ userName });
      const userId = user._id;
      let socket_id = [];
      io.on("connection", async (socket) => {
        try {
          logInfo("Client connected...");
          socket.emit("id", socket.id);
          socket_id.push(socket.id);
          if (socket_id[0] === socket.id) {
            // remove the connection listener for any subsequent
            // connections with the same ID
            io.removeAllListeners("connection");
          }
          socket.on("message", async (msg) => {
            try {
              let message = await Message.create(msg);
              io.emit("message", message);
            } catch (error) {
              logError(error);
            }
          });
          socket.on("disconnect", () => {
            logInfo("Client disconnected...");
            //socket.removeAllListeners();
          });
          if (receiverObjId && userId) {
            const chatLog = await MessageSchema.statics.latest(
              userId,
              receiverObjId
            );
            socket.emit("chatHistory", chatLog);
          }
        } catch (error) {
          logError(error);
        }
      });

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
