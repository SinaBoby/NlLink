const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    chatParticipants: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    ],
    maxUsers: Number,
    isAllowed: Boolean,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Chat", chatSchema);
