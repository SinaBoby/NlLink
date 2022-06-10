import User, { validateUser } from "../models/User.js";
import { logError, logInfo } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
//import getUserWithHashedPassword from "./auth.js";

export const getUserDetails = async (req, res) => {
  try {
    const userName = req.userName;
    const user = await User.findOne({ userName });
    res.status(200).json({ success: true, result: user });
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
        msg: `You need to provide a 'user' object. Received: ${typeof user}`,
      });
    }
    const errorList = validateUser(user);
    if (errorList.length > 0) {
      logError(errorList);
      return res
        .status(500)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      //const userWithHashedPassword = await getUserWithHashedPassword(user);

      const newUser = await User.create(user);
      logInfo(newUser.age);
      return res.status(201).json({ success: true, user: newUser });
    }
  } catch (error) {
    let errors = [];
    logError(error.errors);
    if (error.errors) {
      Object.keys(error.errors).forEach((key) => {
        errors.push(`${key} : ${error.errors[key].message}`);
      });
      logError(error);
      return res
        .status(500)
        .json({ success: false, msg: validationErrorMessage(errors) });
    } else {
      logError(error);
      return res.status(500).json({ success: false, msg: error.message });
    }
  }
};
