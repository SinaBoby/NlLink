import User, { validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import * as fs from "node:fs";
import path from "path";
import { fileURLToPath } from "url";

export const getLoggedInUser = async (req, res) => {
  try {
    const userName = req.userName;
    if (!userName) {
      return res
        .status(401)
        .json({ success: false, msg: "You are not Authenticated" });
    } else {
      const user = await User.findOne({ userName });
      if (!user) {
        return res.status(404).json({ success: false, msg: "User not found" });
      } else {
        res.status(200).json({ success: true, user });
      }
    }
  } catch (error) {
    logError(error);
    return res
      .status(500)
      .json({ success: false, msg: "Server Error, try again later" });
  }
};

export const logout = async (req, res) => {
  try {
    if ("token" in req.cookies && "userStatus" in req.cookies) {
      return res
        .status(200)
        .clearCookie("token")
        .clearCookie("userStatus")
        .json({
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
    // Step 5 - set up multer for storing uploaded files
    const filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(filename);
    const {
      firstName,
      lastName,
      userName,
      userType,
      email,
      password,
      phoneNumber,
      birthDay,
    } = req.body;
    const profileImage = {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: req.file.mimetype,
    };
    let user = {
      firstName,
      lastName,
      userName,
      userType,
      email,
      password,
      phoneNumber,
      birthDay,
      profileImage,
    };

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
