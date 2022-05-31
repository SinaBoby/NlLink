import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true, trim: true },
  userName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  userType: {
    type: String,
    enum: ["NewComer", "Local"],
    required: true,
    default: "NewComer",
  },
  phoneNumber: String,
  birthDay: { type: Date, required: true },
  joinedAt: { type: Date, default: () => Date.now(), immutable: true },
  interests: [String],
  isActive: Boolean,
});

const User = mongoose.model("users", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = [
    "firstName",
    "lastName",
    "userName",
    "email",
    "password",
    "userType",
    "phoneNumber",
    "birthDay",
    "joinedAt",
    "interests",
    "isActive",
  ];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (userObject.firstName == null) {
    errorList.push("firstName is a required field");
  }

  if (userObject.lastName == null) {
    errorList.push("lastName is a required field");
  }

  if (userObject.userName == null) {
    errorList.push("userName is a required field");
  }

  if (userObject.email == null) {
    errorList.push("email is a required field");
  }

  if (userObject.password == null) {
    errorList.push("password is a required field");
  }

  if (userObject.birthDay == null) {
    errorList.push("birthDay is a required field");
  }

  if (userObject.interests == null) {
    errorList.push("interests is a required field");
  }

  return errorList;
};

export default User;
