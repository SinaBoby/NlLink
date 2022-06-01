const mongoose = require("mongoose");
const activitySchema = new mongoose.Schema(
  {
    title: String,
    category: "String",
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
  { timestamps: true },
);
module.exports = mongoose.model("Activity", activitySchema);
