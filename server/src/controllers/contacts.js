import { /* logInfo, */ logError } from "../util/logging.js";
import User from "../models/User.js";
//import { Message } from "../models/Message.js";
//import { io } from "../index.js";
export const getContacts = async (req, res) => {
  const userName = req.userName;
  try {
    if (!userName) {
      res
        .status(401)
        .json({ success: false, msg: "You are not Authenticated" });
    } else {
      // const user = await User.findOne({ userName });
      const { contactsIds } = req.body;
      const contactsUsers = await User.find({ _id: { $in: [...contactsIds] } });
      /*  logInfo(contactsUsers);
      logInfo(contactsIds);
      logInfo(user._id); */
      /* const sentMessages = await Message.find({
        sender: user._id,
      });
      const receivedMessages = await Message.find({
        receiver: user._id,
      }); */

      //console.log(io);
      res.status(200).json({
        success: true,
        contacts: contactsUsers,
      });
    }
  } catch (error) {
    logError(error);
  }
};
