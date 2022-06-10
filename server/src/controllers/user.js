import User, { validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

export const getUserDetails = async (req, res) => {
  try {
    const userName = req.userName;
    if (!userName) {
      res
        .status(401)
        .json({ success: false, msg: "You are not Authenticated" });
    }
    const user = await User.findOne({ userName });
    if (!user) {
      res.status(404).json({ success: false, msg: "User not found" });
    }
    res.status(200).json({ success: true, result: user });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Server Error, try again later" });
  }
};

export const getLoggedInUser = async (req, res) => {
  try {
    const userName = req.userName;
    if (!userName) {
      res
        .status(401)
        .json({ success: false, msg: "You are not Authenticated" });
    }
    const user = await User.findOne({ userName });
    if (!user) {
      res.status(404).json({ success: false, msg: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Server Error, try again later" });
  }
};

export const logout = async (req, res) => {
  try {
    if ("token" in req.cookies) {
      return res.status(200).clearCookie("token").json({
        success: true,
      });
    } else {
      return res.status(401).json({
        success: false,
        msg: "You are not Authenticated",
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
    const errorList = validateUser(user);
    if (typeof user !== "object") {
      return res.status(400).json({
        success: false,
        msg: `BAD REQUEST: You need to provide a 'user' object. Received: ${typeof user}`,
      });
    } else if (errorList.length > 0) {
      logError(errorList);
      return res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newUser = await User.create(user);
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
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errors) });
    } else {
      logError(error);
      return res
        .status(500)
        .json({ success: false, msg: `Server Error: ${error.message}` });
    }
  }
};
