const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    body: {
      type: String,
      maxLength: 255,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Chat",
    },
    seen: Boolean,
    edited: Boolean,
  },
  { timestamps: true },
);
module.exports = mongoose.model("Message", messageSchema);
