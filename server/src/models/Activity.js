// const mongoose = require("mongoose");
import mongoose from "mongoose";
const activitySchema = new mongoose.Schema(
  {
    title: String,
    category: {
      type: String,
      enum: {
        values: [
          "Sport",
          "Language",
          "City Tour",
          "Museum",
          "Food",
          "Training",
          "Music",
          "Volunteer Work",
        ],
        message: (props) => `${props.value} is not a valid category`,
      },
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectID,
      ref: "User",
      required: true,
    },
    startAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      maxLength: 400,
    },
    joinedBy: {
      type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    },
    location: {
      city: { type: String, required: true },
      street: { type: String, required: true },
      postCode: { type: String, required: true },
    },
    maxPeople: Number,
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;
