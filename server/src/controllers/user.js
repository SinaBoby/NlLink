import User, { validateUser } from "../models/User.js";
import { logError, logInfo } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
//import getUserWithHashedPassword from "./auth.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, result: users });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get users, try again later" });
  }
};

export const getLoggedInUser = async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const userName = req.userName;
    logInfo(userName);
    const user = await User.findOne({ userName });
    res.status(200).json({ success: true, user });
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
};

export const logout = async (req, res) => {
  try {
    if ("token" in req.cookies) {
      return res.status(200).clearCookie("token").json({
        success: true,
      });
    } else {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  } catch (error) {
    logError(error);
    return res.status(500).json({
      msg: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { user } = req.body;

    if (typeof user !== "object") {
      return res.status(400).json({
        success: false,
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
          user
        )}`,
      });
    }

    const errorList = validateUser(user);

    if (errorList.length > 0) {
      return res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      //const userWithHashedPassword = await getUserWithHashedPassword(user);

      const newUser = await User.create(user);

      return res.status(201).json({ success: true, user: newUser });
    }
  } catch (error) {
    logError(error);
    return res
      .status(500)
      .json({ success: false, msg: "Unable to create user, try again later" });
  }
};
