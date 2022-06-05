import mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import { logError } from "../util/logging.js";
import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    userName: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    userType: {
      type: String,
      enum: ["NewComer", "Local"],
      required: true,
      default: "NewComer",
    },
    phoneNumber: {
      type: String,
    },
    profileImage: {
      alt: String,
      img: {
        data: Buffer,
        contentType: String,
      },
    },
    birthDay: { type: Date, required: true },
    joinedAt: { type: Date, default: () => Date.now(), immutable: true },
    interests: [String],
    province: {
      type: String,
      enum: [
        "Drenthe",
        "Flevoland",
        "Friesland",
        "Gelderland",
        "Groningen",
        "Limburg",
        "North Brabant",
        "North Holland",
        "Overijssel",
        "South Holland",
        "Utrecht",
        "Zeeland",
      ],
    },
    isActive: Boolean,
    createdActivities: [
      { type: mongoose.SchemaTypes.ObjectId, ref: "Activity" },
    ],
    activities: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Activity" }],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    logError(error);
    next(error);
  }
});
userSchema.methods.isCorrectPassword = async function (password) {
  try {
    // Compare password
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    logError(error);
  }
  // Return false if error
  return false;
};
const User = mongoose.model("user", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = [
    "firstName",
    "lastName",
    "userName",
    "email",
    "phoneNumber",
    "password",
    "userType",
    "birthDay",
    "joinedAt",
    "interests",
    "province",
    "isActive",
    "profileImage",
    "createdActivities",
    "activities",
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

  return errorList;
};

export default User;
